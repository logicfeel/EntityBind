USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[POT_MebPoint_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2019-12-20
-- Update date	: 
-- Description	: 
/*
	@pot_id OR @identifier 둘중 하나는 True 되어야함
	@base_mn : 퍼센트 계산시 기준금액
*/
-- ==============================================================
CREATE PROC [dbo].[POT_MebPoint_SP_C]

	@meb_idx					int,
	@point_it					int				= 0,
	@base_mn					int				= 0,		
	@minus_yn					char(1)			= 'N',
	@pot_id						int				= NULL,
	@identifier					varchar(20)		= NULL,
	@ord_id						varchar(20)		= NULL,
	@caption					nvarchar(30)	= '',
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	/* ----- DECLARE LOCAL ---- */
	DECLARE @total_it			int				= 0
	DECLARE @percent			int				= 0
	DECLARE @point				int				= 0
	DECLARE @method				char(1)


	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @meb_idx <= 0 or @meb_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_idx ', 16, @RESULT);
		END
		
		
		-- 조회 (식별코드로 pot_id 조회)
		IF @pot_id IS NOT NULL or @identifier IS NOT NULL
		BEGIN
			SELECT 
				@pot_id = pot_id,
				@method = method_cd,
				@percent = percent_it,
				@point = point_it
			FROM POT_Master 
			WHERE 
				use_yn = 'Y' and del_yn = 'N'
				and ( 
					identifier = @identifier 
					or
					pot_id = @pot_id
				)
		END
		

		-- 검사 ( 퍼센트 + 기준가)
		IF @method = 'P' AND @base_mn <= 0
		BEGIN
			SET @RESULT = 211
			RAISERROR ('[오류] 퍼센트타입, 기준금액 없음 : @base_mn ', 16, @RESULT);
		END	
		
			
		-- 검사 ( 개별 + 포인트)
		IF @method = 'E' AND @point_it <= 0
		BEGIN
			SET @RESULT = 212
			RAISERROR ('[오류] 개별타입, 입력포인트 없음 : @point_it ', 16, @RESULT);
		END		
		
		
		-- 조회 (퍼센트 포인트)
		IF @method = 'P'
			SET @point_it = @base_mn * (@percent * 0.01)
		ELSE IF @method = 'F'
			SET @point_it = @point
		
			
		/*******************************************************/
		-- 처리 (등록) : 0이상일 경우 등록 갱신함
		IF @point_it > 0
		BEGIN
			-- 처리 : 회원 마스터 포인트 없을시 생성
			IF NOT EXISTS(SELECT * FROM POT_Member a where a.meb_idx = @meb_idx)
			BEGIN
				EXEC [POT_Member_SP_C]	@meb_idx=@meb_idx		
			END


			-- 처리 : 포인트 등록
			INSERT INTO POT_MebPoint
			(
				meb_idx,
				point_it,
				minus_yn,
				pot_id,
				ord_id,
				caption
			)
			VALUES
			(
				@meb_idx,
				@point_it,
				@minus_yn,
				@pot_id,
				@ord_id,
				@caption
			)

			
			-- 결과 저장
			SET @RESULT = @@IDENTITY


			-- 처리 (집계 조회)
			SELECT @total_it = (
				(	
					SELECT ISNULL(SUM(point_it), 0) FROM POT_MebPoint aa 
					WHERE aa.meb_idx = @meb_idx AND aa.minus_yn = 'N'
				) -	(
					SELECT ISNULL(SUM(point_it), 0) FROM POT_MebPoint aa 
					WHERE aa.meb_idx = @meb_idx AND aa.minus_yn = 'Y'
				)
			) 


			-- 처리 (집계 갱신)
			EXEC [POT_Member_SP_U] @meb_idx=@meb_idx, @total_it=@total_it
		END
		
		
		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

		RETURN @RESULT
		
	END TRY
	BEGIN CATCH /***********************************************/
		/* ----- DECLARE CATCH ---- */
		DECLARE @errorMessage	nvarchar(1000)	= ERROR_MESSAGE();
		DECLARE @errorSeverity	int				= ERROR_SEVERITY();
		DECLARE @errorState		int				= ERROR_SEVERITY();
		DECLARE @procName		nvarchar(128)	= OBJECT_NAME(@@PROCID);
        
        /* ----- TRANSACTION ------ */
        IF @tranCounter = 0  
		BEGIN
			ROLLBACK TRANSACTION;
			EXEC [SYS_ErrorLog_SP_C] @procName, @msgPrint_yn, @msgSave_yn;
			RETURN -@errorState;
		END
        ELSE
        BEGIN
            IF XACT_STATE() <> -1  
                ROLLBACK TRANSACTION  ProcedureSave;
			SET @errorMessage = @procName +' >> '+ @errorMessage;
			RAISERROR(@errorMessage, @errorSeverity, @errorState);
		END
	END CATCH	
	SET NOCOUNT OFF	
END

-- ##############################################################
-- #### TEST AREA
/*

	exec [POT_MebPoint_SP_C] 1, 20					-- 덧셈
	exec [POT_MebPoint_SP_C] 1, 30, @minus_yn='Y'	-- 뺄셈

	exec [POT_MebPoint_SP_C] 3, 20					-- 덧셈
	exec [POT_MebPoint_SP_C] 3, 30, @minus_yn='Y'	-- 뺄셈


	-- 퍼센트로 삽입 : 키로 조회
	exec [POT_MebPoint_SP_C] 1, @base_mn=30000, @identifier='AAAA2'

	-- 오류 : 퍼센트 기준가 없음
	exec [POT_MebPoint_SP_C] 1, @identifier='AAAA2'


	-- 퍼센트로 삽입 : id 로 조회
	exec [POT_MebPoint_SP_C] 1, @base_mn=30000, @pot_id = 2

	-- 개별포인트
	exec [POT_MebPoint_SP_C] 1, @point_it=10000, @pot_id = 3

	-- 지정 포인트
	exec [POT_MebPoint_SP_C] @meb_idx=1, @point_it=3000, @pot_id = 1

	-- 개별포인트, 
	exec [POT_MebPoint_SP_C] @meb_idx=1, @point_it=3000, @caption='주문취소(포인트복구)'
	exec [POT_MebPoint_SP_C] @meb_idx=1, @point_it=3000, @caption='환불완료(포인트복구)'

	-- 개별포인트, 차감
	exec [POT_MebPoint_SP_C] @meb_idx=1, @point_it=3000, @caption='주문결제(포인트사용)', @minus_yn='Y'

	-- 개별 포인트 
	exec [POT_MebPoint_SP_C] @meb_idx=1, @point_it=4000, @caption='결제완료(포인트지급)'

	-- 개별포인트, 차감
	exec [POT_MebPoint_SP_C] @meb_idx=1, @point_it=4000, @caption='환불완료(포인트회수)', @minus_yn='Y'

	-- 테스트 지급
	exec [POT_MebPoint_SP_C] @meb_idx=37, @point_it=40000, @caption='관리자 테스트(포인트지급)', @minus_yn='N'

	select * from POT_Member
	select * from POT_MebPoint
	select * from POT_Master


	select * from MEB_Master 37
	select * from ord_product where ord_id ='20210408120228'
	
*/

GO
