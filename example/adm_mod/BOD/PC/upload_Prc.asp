<% @CODEPAGE="65001" language="VBScript" %>
<!--#include virtual="/Module/SYS/DextUpload.Cls.asp"-->
<%
    ' Dim uploadform
    ' Set uploadform = Server.CreateObject("DEXT.FileUpload")
    
    ' ' set objImage =server.CreateObject("DEXT.ImageProc")
    
    ' uploadform.DefaultPath = Server.MapPath("/Upload")


    ' uploadform.Save
    ' Set uploadform = Nothing

%>

<%
    Dim cDext      : Set cDext = New DextUpload_Cls
    Dim imgName

    ' cDext.SaveDir   =  "Product"

    cDext.DefaultDir   =  "/Upload/test"

    cDext.Thumbnail =  True

    imgName = cDext.Save("upfile", "100", "200")


    ' imgName = cDext.Delete("1-2.jpg")

    Response.write imgName & "<br>"
    Response.write cDext.DefaultPath & "<br>"
    Response.write cDext.SavePath & "<br>"

    Response.write cDext.OldName & "<br>"
    Response.write cDext.imgName & "<br>"
    Response.write cDext.ImgPath & "<br>"
    Response.write cDext.ImgUrl & "<br>"
    Response.write cDext.Size & "<br>"
    Response.write cDext.Width & "<br>"
    Response.write cDext.Height & "<br>"


    ' call cDext.Save "upfile", "1", "2"

    Set cDext = Nothing
%>