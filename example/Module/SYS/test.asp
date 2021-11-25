<% @Language="VBScript" CODEPAGE="949" %>
<%
    Response.CharSet="euc-kr"
    Session.codepage="949"
    Response.codepage="949"
    Response.ContentType="text/html;charset=euc-kr"
%>
<%
    Dim sBASE_64_CHARACTERS, sBASE_64_CHARACTERSansi
    sBASE_64_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    sBASE_64_CHARACTERSansi	= strUnicode2Ansi(sBASE_64_CHARACTERS)

    Function strUnicodeLen(asContents)
        Dim asContents1	: asContents1 ="a"	& asContents
        Dim Len1		: Len1=Len(asContents1)
        Dim K		: K=0
        Dim I, Asc1

        For I=1 To Len1
            Asc1	= asc(mid(asContents1,I,1))
            IF Asc1 < 0 Then Asc1	= 65536 + Asc1
            IF Asc1 > 255 Then
                K	= K + 2
            ELSE
                K	= K + 1
            End IF
        Next

        strUnicodeLen = K - 1
    End Function

    Function strUnicode2Ansi(asContents)
        Dim Len1			: Len1 = Len(asContents)
        Dim I, VarCHAR, VarASC, VarHEX, VarLOW, VarHIGH

        strUnicode2Ansi	= ""

        For I = 1 to Len1
            VarCHAR	= Mid(asContents,I,1)
            VarASC	= Asc(VarCHAR)
            IF VarASC < 0 Then VarASC = VarASC + 65536
            IF VarASC > 255 Then
                VarHEX		= Hex(VarASC)
                VarLOW		= Left(VarHEX,2)
                VarHIGH		= Right(VarHEX,2)
                strUnicode2Ansi	= strUnicode2Ansi & ChrB("&H" & VarLOW ) & ChrB("&H" & VarHIGH )
            Else
                strUnicode2Ansi	= strUnicode2Ansi & ChrB(VarASC)
            End IF
        Next
    End Function

    Function strAnsi2Unicode(asContents)
        Dim Len1			: Len1		= LenB(asContents)
        Dim VarCHAR, VarASC, I

        strAnsi2Unicode	= ""

        IF Len1=0 Then	Exit Function

        For I=1 To Len1
            VarCHAR	= MidB(asContents,I,1)
            VarASC	= AscB(VarCHAR)
            IF VarASC > 127 Then
                strAnsi2Unicode	= strAnsi2Unicode & Chr(AscW(MidB(asContents, I+1,1) & VarCHAR))
                I = I + 1
            Else
                strAnsi2Unicode	= strAnsi2Unicode & Chr(VarASC)
            End IF
        Next

    End function

    Function Base64encode(asContents)
        Dim lnPosition
        Dim lsResult
        Dim Char1
        Dim Char2
        Dim Char3
        Dim Char4
        Dim Byte1
        Dim Byte2
        Dim Byte3
        Dim SaveBits1
        Dim SaveBits2
        Dim lsGroupBinary
        Dim lsGroup64
        Dim M3, M4, Len1, Len2

        Len1			=LenB(asContents)

        IF Len1 < 1 Then
            Base64encode	= ""
            Exit Function
        End IF

        M3=Len1 Mod 3

        IF M3 > 0 Then asContents = asContents & String(3 - M3, ChrB(0))

        IF m3 > 0 Then
            Len1	= Len1 + (3 - M3)
            Len2	= Len1 - 3
        Else
            Len2	= Len1
        End IF

        lsResult	= ""

        For lnPosition = 1 To Len2 Step 3
            lsGroup64	= ""
            lsGroupBinary	= MidB(asContents, lnPosition, 3)

            Byte1		= AscB(MidB(lsGroupBinary, 1, 1))	: SaveBits1	= Byte1 And 3
            Byte2		= AscB(MidB(lsGroupBinary, 2, 1))	: SaveBits2	= Byte2 And 15
            Byte3		= AscB(MidB(lsGroupBinary, 3, 1))

            Char1		= MidB(sBASE_64_CHARACTERSansi, ((Byte1 And 252) \ 4) + 1, 1)
            Char2		= MidB(sBASE_64_CHARACTERSansi, (((Byte2 And 240) \ 16) Or (SaveBits1 * 16) And &HFF) + 1, 1)
            Char3		= MidB(sBASE_64_CHARACTERSansi, (((Byte3 And 192) \ 64) Or (SaveBits2 * 4) And &HFF) + 1, 1)
            Char4		= MidB(sBASE_64_CHARACTERSansi, (Byte3 And 63) + 1, 1)
            lsGroup64	= Char1 & Char2 & Char3 & Char4

            lsResult		= lsResult & lsGroup64
        Next

        IF M3 > 0 Then
            lsGroup64	= ""
            lsGroupBinary	= MidB(asContents, Len2 + 1, 3)

            Byte1		= AscB(MidB(lsGroupBinary, 1, 1))	: SaveBits1	= Byte1 And 3
            Byte2		= AscB(MidB(lsGroupBinary, 2, 1))	: SaveBits2	= Byte2 And 15
            Byte3		= AscB(MidB(lsGroupBinary, 3, 1))

            Char1		= MidB(sBASE_64_CHARACTERSansi, ((Byte1 And 252) \ 4) + 1, 1)
            Char2		= MidB(sBASE_64_CHARACTERSansi, (((Byte2 And 240) \ 16) Or (SaveBits1 * 16) And &HFF) + 1, 1)
            Char3		= MidB(sBASE_64_CHARACTERSansi, (((Byte3 And 192) \ 64) Or (SaveBits2 * 4) And &HFF) + 1, 1)

            IF M3=1 Then
                lsGroup64	= Char1 & Char2 & ChrB(61) & ChrB(61)
            Else
                lsGroup64	= Char1 & Char2 & Char3 & ChrB(61)
            End IF

            lsResult		= lsResult & lsGroup64
        End IF

        Base64encode = lsResult
    End Function

    Function Base64decode(asContents)
           Dim lsResult
           Dim lnPosition
           Dim lsGroup64, lsGroupBinary
           Dim Char1, Char2, Char3, Char4
           Dim Byte1, Byte2, Byte3
           Dim M4, Len1, Len2

           Len1	   = LenB(asContents)
           M4	   = Len1 Mod 4

           IF Len1 < 1 Or M4 > 0 Then
               Base64decode = ""
               Exit Function
           End IF

           IF MidB(asContents, Len1, 1) = ChrB(61) Then	   M4 = 3
           IF MidB(asContents, Len1-1, 1) = ChrB(61) Then	   M4 = 2

           IF M4 = 0 Then
               Len2	   = Len1
           Else
               Len2	   = Len1 - 4
           End IF

           For lnPosition = 1 To Len2 Step 4
               lsGroupBinary	   = ""
               lsGroup64	   = MidB(asContents, lnPosition, 4)

               Char1	   	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 1, 1)) - 1
               Char2	   	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 2, 1)) - 1
               Char3	   	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 3, 1)) - 1
               Char4	   	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 4, 1)) - 1

               Byte1	   	   = ChrB(((Char2 And 48) \ 16) Or (Char1 * 4) And &HFF)
               Byte2	   	   = lsGroupBinary & ChrB(((Char3 And 60) \ 4) Or (Char2 * 16) And &HFF)
               Byte3	   	   = ChrB((((Char3 And 3) * 64) And &HFF) Or (Char4 And 63))
               lsGroupBinary	   = Byte1 & Byte2 & Byte3

               lsResult	   	   = lsResult & lsGroupBinary
           Next

           IF M4 > 0 Then
               lsGroupBinary	   = ""
               lsGroup64	   = MidB(asContents, Len2 + 1, M4) & ChrB(65)
               IF M4=2 Then
                   lsGroup64	   = lsGroup64 & chrB(65)
               End IF
               Char1	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 1, 1)) - 1
               Char2	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 2, 1)) - 1
               Char3	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 3, 1)) - 1
               Char4	   = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 4, 1)) - 1

               Byte1	   = ChrB(((Char2 And 48) \ 16) Or (Char1 * 4) And &HFF)
               Byte2	   = lsGroupBinary & ChrB(((Char3 And 60) \ 4) Or (Char2 * 16) And &HFF)
               Byte3	   = ChrB((((Char3 And 3) * 64) And &HFF) Or (Char4 And 63))

               IF M4=2 Then
                   lsGroupBinary	   = Byte1
               elseIF M4=3 Then
                   lsGroupBinary	   = Byte1 & Byte2
               end IF

               lsResult	   	   	   = lsResult & lsGroupBinary
           End IF

           Base64decode	   	   	   = lsResult
    End Function
    '################################## 사용 샘플 ##################################

    Dim sms_url
        sms_url = "https://sslsms.cafe24.com/sms_sender.php" ' SMS 요청 URL

    Dim user_id	    : user_id	= "jnsglobal9778"   'SMS 아이디
    Dim secure	    : secure	= "d4c3aecf43530a00beaf805e3f6a8aa5"  '인증키
    Dim encoderurl  : encoderurl = "Y" '리턴 URL을 encode 해서 받을지를 결정합니다. (사용:Y, 사용안함:N, Y가 아닐 경우 변수를 여러개 넘겨받을 없습니다.)
    Dim subject     : subject="" '제목(LMS일 경우만)
    Dim msg	        : msg	= request.Form("msg")
    Dim rphone	    : rphone	= request.Form("rphone")
    Dim sphone1	    : sphone1	= request.Form("sphone1")
    Dim sphone2	    : sphone2	= request.Form("sphone2")
    Dim sphone3	    : sphone3	= request.Form("sphone3")
    Dim rdate	    : rdate	= request.Form("rdate")
    Dim reserveTime	: reserveTime	= request.Form("rtime")
    Dim mode	    : mode	= "1"  '// base64 사용시 반드시 모드값을 1로 주셔야 합니다.
    Dim rtime	    : rtime	= request.Form("rtime")
    Dim returnurl	: returnurl	= request.Form("returnurl")
    Dim testflag	: testflag	= request.Form("testflag")
    Dim destination	: destination	= request.Form("destination")
    Dim repeatFlag	: repeatFlag	= request.Form("repeatFlag")
    Dim repeatNum	: repeatNum	= request.Form("repeatNum")
    Dim repeatTime	: repeatTime	= request.Form("repeatTime")
    Dim actionFlag  : actionFlag = request("action")
    Dim nointeractive  : nointeractive = request("nointeractive")  '성공시 대화 상자를 사용 하지 않게 합니다.
    Dim smsType	: smsType	= request.Form("smsType") 'LMS 사용시 L
    IF smsType="L" Then
        subject = request.Form("subject")
        subject =  strAnsi2Unicode(Base64encode(strUnicode2Ansi(subject)))
    End IF

    user_id  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(user_id)))
    secure  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(secure)))
    msg  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(msg)))
    rphone  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(rphone)))
    sphone1  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(sphone1)))
    sphone2  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(sphone2)))
    sphone3  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(sphone3)))
    rdate  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(rdate)))
    reserveTime  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(reserveTime)))
    mode  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(mode)))
    rtime  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(rtime)))
    returnurl  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(returnurl)))
    testflag  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(testflag)))
    destination  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(destination)))
    repeatFlag  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(repeatFlag)))
    repeatNum  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(repeatNum)))
    repeatTime  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(repeatTime)))
    smsType  = strAnsi2Unicode(Base64encode(strUnicode2Ansi(smsType)))

    Dim sendurl : sendurl = "http://" & Request.ServerVariables("server_name") & request.ServerVariables("PATH_INFO")


    ' 발송하기
        Dim PostData
        PostData = "lang="
        PostData = PostData & "&sendurl=" & sendurl
        PostData = PostData & "&user_id=" & user_id
        PostData = PostData & "&secure=" & secure
        PostData = PostData & "&subject=" & subject
        PostData = PostData & "&msg=" & msg
        PostData = PostData & "&rphone=" & rphone
        PostData = PostData & "&sphone1=" & sphone1
        PostData = PostData & "&sphone2=" & sphone2
        PostData = PostData & "&sphone3=" & sphone3
        PostData = PostData & "&rdate=" & rdate
        PostData = PostData & "&rtime=" & rtime
        PostData = PostData & "&reserveTime=" & reserveTime
        PostData = PostData & "&mode=" & mode
        PostData = PostData & "&returnurl=" & returnurl
        PostData = PostData & "&testflag=" & testflag
        PostData = PostData & "&destination=" & destination
        PostData = PostData & "&repeatFlag=" & repeatFlag
        PostData = PostData & "&repeatNum=" & repeatNum
        PostData = PostData & "&repeatTime=" & repeatTime
        PostData = PostData & "&nointeractive=" & nointeractive
        PostData = PostData & "&encoderurl=" & encoderurl
        PostData = PostData & "&smsType=" & smsType



Dim ServerXmlHttp
Dim tmpResult

Set ServerXmlHttp = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")
ServerXmlHttp.open "POST", sms_url
ServerXmlHttp.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
ServerXmlHttp.setRequestHeader "Content-Length", Len(PostData)

ServerXmlHttp.send PostData
If ServerXmlHttp.status = 200 Then
    tmpResult = ServerXmlHttp.responseText
Else
    tmpResult = "Connection Fail"
    ' Handle missing response or other errors here
End If

Set ServerXmlHttp = Nothing

Dim rMsg    : rMsg	=  split(tmpResult , ",")
Dim Result    : Result	=  rMsg (0)
Dim Count    : Count	=  rMsg (1)
Dim alert      : alert  = ""
SELECT CASE Result
    CASE "Test Success!"
        alert = "테스트성공"
        alert = alert & " 잔여건수는 "+ Count+"건 입니다."
    CASE "success"
        alert = "문자 정상적으로 전송되었습니다."
        alert = alert & " 잔여건수 : "+ Count+"건 "
    CASE "reserved"
        alert = "예약되었습니다."
        alert = alert & " 잔여건수는 "+ Count+"건 입니다."
    CASE "3205"
        alert = "잘못된 번호형식입니다."
    CASE "0044"
        alert = "스팸문자는 보낼 수 없습니다."
    CASE Else
        alert = "[Error]"+Result
END Select

If nointeractive="1" Then
    If Result  = "Test Success!" Or Result  = "success" Or Result  = "reserved" Then
    Else
        Response.Write("<script>alert('" + alert + "')</script>")
    End if
Else
    Response.Write("<script>alert('" + alert + "')</script>")
End if
IF returnurl <> "" Then
    Response.Write("<script>location.href='"+request.Form("returnurl")+"?result=" +tmpResult+"';</script>")
ELSE
    Response.Write("<script>history.go(-1);</script>")
END if
%>