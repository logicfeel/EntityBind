<% @Language="VBScript" CODEPAGE="949" %>
<%
Response.CharSet="euc-kr"
Session.codepage="949"
Response.codepage="949"
Response.ContentType="text/html;charset=euc-kr"
%>
    <script language="javascript" runat="server" src="JSON_JS.asp"></script>
    <html>

    <head>
        <title>sms - asp</title>
        <script type="text/javascript">
            function setPhoneNumber(val) {
                var numList = val.split("-");
                document.smsForm.sphone1.value = numList[0];
                document.smsForm.sphone2.value = numList[1];
            if(numList[2] != undefined){
                    document.smsForm.sphone3.value = numList[2];
        }
            }
        </script>
    </head>

    <body>

    <form method="post" name="smsForm" action="test.asp">
        <input type="hidden" name="action" value="go"> �߼�Ÿ��
        <span>
          <input type="radio" name="smsType" value="S">�ܹ�(SMS)</span>
        <span>
          <input type="radio" name="smsType" value="L">�幮(LMS)</span>
        <br /> ���� :
        <input type="text" name="subject" value="����"> �幮(LMS)�� ���(�ѱ�30���̳�)
        <br /> ���۸޼���
        <textarea name="msg" cols="30" rows="10" style="width:455px;">�̰� asp �׽�Ʈ�������Դϴ�</textarea>
        <br />
        <br />
        <p>�ܹ�(SMS) : �ִ� 90byte���� ������ �� ������, �ܿ��Ǽ� 1���� �����˴ϴ�.
            <br /> �幮(LMS) : �ѹ��� �ִ� 2,000byte���� ������ �� ������ 1ȸ �߼۴� �ܿ��Ǽ� 3���� �����˴ϴ�.
        </p>
        <br />�޴� ��ȣ
        <input type="text" name="rphone" value="010-4788-8113"> ��) 011-011-111 , '-' �����ؼ� �Է�.
        <br />�̸����Թ�ȣ
        <input type="text" name="destination" value="" size=80> ��) 010-000-0000|ȫ�浿
        <br /> ������ ��ȣ
        <input type="hidden" name="sphone1">
        <input type="hidden" name="sphone2">
        <input type="hidden" name="sphone3">
        <%
        Set ServerXmlHttp = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")
        Dim PostData
        PostData = "userId=jnsglobal9778"   'SMS ���̵�
        PostData = PostData & "&passwd=d4c3aecf43530a00beaf805e3f6a8aa5"  '����Ű

        ServerXmlHttp.open "POST", "https://sslsms.cafe24.com/smsSenderPhone.php"
        ServerXmlHttp.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
        ServerXmlHttp.setRequestHeader "Content-Length", Len(PostData)
        ServerXmlHttp.send PostData

        If ServerXmlHttp.status = 200 Then
        TextResponse = ServerXmlHttp.responseText
        'XMLResponse = ServerXmlHttp.responseXML
        'StreamResponse = ServerXmlHttp.responseStream

        Dim jsonData  : Set jsonData  = JSON.parse(TextResponse)
        IF jsonData.result  = "Success" THEN
        Dim jsonDataList : Set jsonDataList = jsonData.list
        Dim selectText
        selectText = "<select name=""sendPhone"" onchange=""setPhoneNumber(this.value)"">"
        selectText = selectText & "<option value="""">�߽Ź�ȣ�� ������ �ּ���</option>"
        For i = 0 To jsonDataList.Length - 1
        selectText = selectText & "<option value=""" & jsonDataList.Get(i) & """>"
        selectText = selectText & jsonDataList.Get(i) & "</option>"
        Next
        selectText = selectText & "</select>"
        Response.Write selectText
        ELSE
        '�߽Ź�ȣ ��ȸ����
        END IF

        Else
        ' ���ӿ���
        End If
        Set ServerXmlHttp = Nothing

        %>
        <br />���� ��¥
        <input type="text" name="rdate" maxlength="8"> ��)20090909
        <br />���� �ð�
        <input type="text" name="rtime" maxlength="6"> ��)173000 ,���� 5�� 30��,����ð��� �ּ� 10�� �̻����� ����.
        <br />return url
        <input type="text" name="returnurl" maxlength="64" value="">
        <br /> test flag
        <input type="text" name="testflag" maxlength="1"> ��) �׽�Ʈ��: Y
        <br />nointeractive
        <input type="text" name="nointeractive" maxlength="1"> ��) ����� ��� : 1, ������ ��ȭ����(alert)�� ����.
        <br />�ݺ�����
        <input type="checkbox" name="repeatFlag" value="Y">
        <br /> �ݺ�Ƚ��
        <select name="repeatNum">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select> ��) 1~10ȸ ����.
        <br />���۰���
        <select name="repeatTime"> ��)15�� �̻���� ����.
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
        </select>�и���
        <br>
        <input type="submit" value="����">
        <br/>����� ��å�� ���� �߽Ź�ȣ�� ���Ź�ȣ�� ���� ��� �߼۵��� �ʽ��ϴ�.
    </form>
    </body>

    </html>