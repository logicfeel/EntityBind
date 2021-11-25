
<HTML> 
<HEAD>
<%
If Request.ServerVariables("Request_Method")<>"POST" Then
%>
</HEAD> 
<BODY> 
<FORM NAME="write_form" METHOD="post" ACTION="" ENCTYPE="multipart/form-data"> 
<INPUT TYPE="file" NAME="file1">
<BR> 
<INPUT TYPE="submit" VALUE="upload" NAME="Submit1"> 
<%
ELSE
    set uploadform=server.CreateObject("DEXT.FileUpload")
    uploadform.DefaultPath= Server.MapPath("/Upload")
    FileName=uploadform.save


    response.write FileName
End If
%>
</FORM> 
</BODY> 
</HTML>