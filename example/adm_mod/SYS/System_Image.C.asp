<% @CODEPAGE="65001" language="VBScript" %>
<%
'******************************************************************************
' FILENAME      : 
'------------------------------------------------------------------------------
' PROGRAM NAME  : 
' AUTHOR        : 로직
' DESCRIPTION   :
' HISTORY
'------------------------------------------------------------------------------
' DATE        NAME        DESCRIPTION
'------------------------------------------------------------------------------
'
'   확인
'   /admin/adm_mod/sto/Account.C.asp?cmd=LIST&doctype=xml
'
'******************************************************************************
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Define.I.asp"-->
<!--#include virtual="/Module/SYS/SYS_Image.Cls.asp"-->
<!--#include virtual="/Module/SYS/DextUpload.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화

    Dim cDext       : Set cDext = New DextUpload_Cls
    Dim uploadform 

    ' Set uploadform               = Server.CreateObject("DEXT.FileUpload")
    ' uploadform.DefaultPath       = Server.MapPath("/Upload")

    uploadform = cDext.Uploadform

    Dim cmd             : cmd           = UCase(uploadform("cmd"))
    Dim doctype         : doctype       = UCase(uploadform("doctype"))
    
    Dim suffix          : suffix   = uploadform("suffix")
    Dim prefix          : prefix   = uploadform("prefix")

    Dim position_cd     : position_cd   = uploadform("position_cd")
    Dim pos_idx         : pos_idx       = uploadform("pos_idx")
    Dim pos_id          : pos_id        = uploadform("pos_id")
    Dim sub_idx         : sub_idx       = uploadform("sub_idx")
    Dim imgName         : imgName       = uploadform("imgName")
    Dim orgName         : orgName       = uploadform("orgName")
    Dim imgPath         : imgPath       = uploadform("imgPath")
    Dim imgUrl          : imgUrl        = uploadform("imgUrl")
    Dim width_it        : width_it      = uploadform("width_it")
    Dim height_it       : height_it     = uploadform("height_it")
    Dim size_it         : size_it       = uploadform("size_it")

    Dim img_idx         : img_idx       = uploadform("img_idx")
    Dim file_idx        : file_idx      = uploadform("file_idx")

    Dim keyword         : keyword       = uploadform("keyword")
    Dim sort_cd         : sort_cd       = uploadform("sort_cd")
    Dim page_size       : page_size     = uploadform("page_size")
    Dim page_count      : page_count    = uploadform("page_count")

    Dim msgSave_yn      : msgSave_yn    = uploadform("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = uploadform("msg_Print_yn")


    ' Dim cmd             : cmd           = UCase(Request("cmd"))
    ' Dim doctype         : doctype       = UCase(Request("doctype"))

    ' Dim position_cd     : position_cd   = Request("position_cd")
    ' Dim pos_idx         : pos_idx       = Request("pos_idx")
    ' Dim pos_id          : pos_id        = Request("pos_id")
    ' Dim sub_idx         : sub_idx       = Request("sub_idx")
    ' Dim imgName         : imgName       = Request("imgName")
    ' Dim orgName         : orgName       = Request("orgName")
    ' Dim imgPath         : imgPath       = Request("imgPath")
    ' Dim imgUrl          : imgUrl        = Request("imgUrl")
    ' Dim width_it        : width_it      = Request("width_it")
    ' Dim height_it       : height_it     = Request("height_it")
    ' Dim size_it         : size_it       = Request("size_it")

    ' Dim img_idx         : img_idx       = Request("img_idx")
    ' Dim file_idx        : file_idx      = Request("file_idx")

    ' Dim keyword         : keyword       = Request("keyword")
    ' Dim sort_cd         : sort_cd       = Request("sort_cd")
    ' Dim page_size       : page_size     = Request("page_size")
    ' Dim page_count      : page_count    = Request("page_count")

    ' Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    ' Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Dim cImage      : Set cImage = New SYS_Image_Cls
    

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then

        iMsgCode = -1000
        ' 필수값 검사
        If Len(position_cd) > 0  Then
            '프로퍼티 <필수>
            cImage.Position_cd      = position_cd



            ' 프로퍼티 <선택>
            If Len(pos_idx) > 0     Then cImage.Pos_idx  = pos_idx
            If Len(pos_id) > 0      Then cImage.Pos_id   = pos_id
            If Len(sub_idx) > 0     Then cImage.Sub_idx  = sub_idx
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode

            ' 1) DB 생성
            Call cImage.Create(iReturn, img_idx, file_idx)

             ' 2) 이미지 저장
            cDext.SaveDir       =  position_cd
            cDext.Thumbnail     =  True
            If Len(prefix) > 0  Then cDext.Prefix  = prefix
            If Len(suffix) > 0  Then cDext.Suffix  = suffix

            imgName = cDext.Save("upfile", img_idx, file_idx)
            ' imgName = cDext.Save("upfile", "1", "2")              -- 테스트

            ' 3) DB 정보 갱신
            ' Call cImage.Init()
            cImage.Img_idx      = img_idx
            cImage.File_idx     = file_idx
            cImage.OrgName      = cDext.OldName     ' 원본 이름
            cImage.ImgName      = cDext.imgName     ' 이미지명
            cImage.ImgPath      = cDext.ImgPath     ' 이미지 path
            cImage.ImgUrl       = cDext.ImgUrl      ' 이미지 url
            cImage.Size_it      = cDext.Size        ' 사이즈
            cImage.Width_it     = cDext.Width       ' 가로
            cImage.Height_it    = cDext.Height      ' 세로

            Call cImage.Update(iReturn)

           Select Case UCase(doctype)
                Case "XML"
                    strContent = "<table "
                    strContent = strContent & " return='"& iReturn &"' "
                    strContent = strContent & " img_idx='"& img_idx &"' "
                    strContent = strContent & " file_idx='"& file_idx &"' "
                    strContent = strContent & " imgurl='"& file_idx &"' "
                    strContent = strContent & "></table>"
                Case "JSON"
                    strContent = strContent & "{"
                    strContent = strContent & "  ""table"": {"
                    strContent = strContent & "    ""return"": """ & iReturn & """ "
                    strContent = strContent & "    , ""img_idx"": """ & img_idx & """ "
                    strContent = strContent & "    , ""file_idx"": """ & file_idx & """ "            
                    strContent = strContent & "    , ""imgurl"": """ & cDext.ImgUrl & """ "                                
                    strContent = strContent & "  }"
                    strContent = strContent & "}"
            End Select

        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If (Len(img_idx) > 0 and Len(file_idx) > 0 ) or Len(position_cd) > 0 Then
            ' 프로퍼티 <선택>
            ' 방식 1)
            If Len(img_idx) > 0     Then cImage.Img_idx  = img_idx
            If Len(file_idx) > 0    Then cImage.File_idx  = file_idx
            ' 방식 2)
            If Len(position_cd) > 0     Then cImage.Position_cd  = position_cd
            If Len(pos_idx) > 0     Then cImage.Pos_idx  = pos_idx
            If Len(pos_id) > 0      Then cImage.Pos_id  = pos_id
            If Len(sub_idx) > 0     Then cImage.Sub_idx  = sub_idx
            ' 프로퍼티 <옵션>
            cImage.MsgCode      = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cImage.ReadXml(iReturn)
                Case "JSON"
                    strContent = cImage.ReadJson(iReturn)
                Case "DIC"
                    Set oDic = cImage.ReadDic(iReturn)        
                Case else
                    Set oRs = cImage.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(img_idx) > 0 and Len(file_idx) > 0  Then
            ' 프로퍼티 <필수>
            cImage.Img_idx      = img_idx
            cImage.File_idx     = file_idx
            ' 프로퍼티 <선택>
            If Len(imgName) > 0     Then cImage.ImgName     = imgName
            If Len(orgName) > 0     Then cImage.OrgName     = orgName
            If Len(imgPath) > 0     Then cImage.ImgPath     = imgPath
            If Len(imgUrl) > 0      Then cImage.ImgUrl      = imgUrl
            If Len(width_it) > 0    Then cImage.Width_it    = width_it
            If Len(height_it) > 0   Then cImage.Height_it   = height_it
            If Len(size_it) > 0     Then cImage.Size_it     = size_it
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
                Case "XML"
                    strContent = cImage.UpdateXml(iReturn)
                Case "JSON"
                    strContent = cImage.UpdateJson(iReturn)
                Case "DIC"
                    Set oDic = cImage.UpdateDic(iReturn)        
                Case else
                    Set oRs = cImage.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(img_idx) > 0 and Len(file_idx) > 0  Then
            ' 프로퍼티 <필수>
            cImage.Img_idx      = img_idx
            cImage.File_idx     = file_idx
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode

            ' 이미지 정보 조회
            Set oDic = cImage.ReadDic(iReturn)         
            imgPath = oDic.Item(0)("imgPath")

            ' 이미지 삭제
            Dim success
            success = cDext.Delete(imgPath)

            If success Then
                Select Case UCase(doctype)
                    Case "XML"
                        strContent = cImage.DeleteXml(iReturn)
                    Case "JSON"
                        strContent = cImage.DeleteJson(iReturn)
                    Case "DIC"
                        Set oDic = cImage.DeleteDic(iReturn)        
                    Case else
                        Set oRs = cImage.Delete(iReturn)
                End Select
            Else
                iReturn = -4002
            End If
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 필수값 검사
        If Len(img_idx) > 0 or Len(position_cd) > 0 Then

            ' 방식 1)
            If Len(img_idx) > 0     Then cImage.Img_idx  = img_idx
            ' 방식 2)
            If Len(position_cd) > 0     Then cImage.Position_cd  = position_cd
            If Len(pos_idx) > 0     Then cImage.Pos_idx  = pos_idx
            If Len(pos_id) > 0      Then cImage.Pos_id  = pos_id
            If Len(sub_idx) > 0     Then cImage.Sub_idx  = sub_idx

            ' 프로퍼티 <선택>
            If Len(keyword) > 0     Then cImage.Keyword        = keyword
            If Len(page_size) > 0   Then cImage.Page_size      = page_size
            If Len(page_count) > 0  Then cImage.Page_count     = page_count
            If Len(sort_cd) > 0     Then cImage.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cImage.ListXml(iReturn, iRowTotal)
                Case "JSON"
                    strContent = cImage.ListJson(iReturn, iRowTotal)
                Case "DIC"
                    Set oDic = cImage.ListDic(iReturn, iRowTotal)        
                Case else
                    Set oRs = cImage.List(iReturn, iRowTotal)
            End Select
        Else
            iReturn = iMsgCode
        End If

    Else
        iReturn = -10000
    End If


    '-------------------------------------------------
    ' 출력
    If doctype = "XML" Then

        If iReturn < 0 and IsEmpty(strContent) Then 
            strContent = "<table return='" & iReturn & "'/>"
        End If
        Response.ContentType = "text/xml"  
        Response.Write "<?xml version='1.0' encoding='UTF-8'?>"
        Response.Write strContent

    ElseIf doctype = "JSON" Then

        If iReturn < 0 and IsEmpty(strContent) Then 
            ' strContent = "{ ""table"": { ""return"": " & iReturn & " } }"
            strContent = "{ ""table"": { ""return"": """ & iReturn & """, ""test"": """ &cmd& """} }"
        End If
        Response.ContentType = "application/json"
        Response.Write strContent

    Else
        Response.Write iReturn      '결과값만 출력 (필요시 하단에 구현)
    End If

    '객체 해제
    Set oRs = Nothing
    Set oDic = Nothing
    Set cImage = Nothing
    Set cDext = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->