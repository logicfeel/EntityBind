<%
    ' 기능
    '   - 저장파일명 지정
    '   - Dext 접근의 일반화

    Class DextUpload_Cls

        Private m_oUploadform
        Private m_oImage
        ' URL
        Private m_sDefaultDir
        Private m_sSaveDir          
        ' Path
        Private m_sDefaultPath
        Private m_sSavePath
        ' fix
        Private m_sPrefix
        Private m_sSuffix
        Private m_sThumbSuffix
        ' bool
        Private m_bOverwrite
        Private m_bThumbnail
        ' Name
        Private m_sOldName      ' DB
        Private m_sImgName      ' DB
        Private m_sImgPath      ' DB
        Private m_sImgUrl       ' DB
        Private m_iSize         ' DB
        Private m_iWidth        ' DB
        Private m_iHeight       ' DB

        '---------------------------------------------------------------------------
        ' 생성자
        '---------------------------------------------------------------------------
		Private Sub Class_Initialize()

            m_sDefaultDir                   = "/Upload"
            m_sSaveDir                      = ""

            m_sDefaultPath                  = Server.MapPath(m_sDefaultDir)
            m_sSavePath                     = m_sDefaultPath & "\" & m_sSaveDir

            Set m_oUploadform               = Server.CreateObject("DEXT.FileUpload")
            m_oUploadform.AutoMakeFolder    = True
            m_oUploadform.DefaultPath       = m_sDefaultPath
            set m_oImage                    = server.CreateObject("DEXT.ImageProc")

            m_sPrefix                       = ""
            m_sSuffix                       = ""
            m_sThumbSuffix                  = "-thumb"

            m_bOverwrite                    = True
            m_bThumbnail                    = False

            m_sOldName                      = ""
            m_sImgName                      = ""
            m_sImgPath                      = ""
            m_sImgUrl                       = 0
            m_iSize                         = 0
            m_iWidth                        = 0
            m_iHeight                       = 0

        End Sub

        '---------------------------------------------------------------------------
        ' 소멸자
        '---------------------------------------------------------------------------
        Private Sub Class_Terminate()
            Set m_oUploadform      = Nothing
        End Sub

        '---------------------------------------------------------------------------
        ' 프로퍼티 설정
        '---------------------------------------------------------------------------

        Public Property Get Uploadform()	 					
            Set Uploadform = m_oUploadform
        End Property 

        'DefaultDir
        Public Property Let DefaultDir(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_sDefaultDir                   = p_Value
                m_sDefaultPath                  = Server.MapPath(m_sDefaultDir)
                m_oUploadform.DefaultPath       = m_sDefaultPath
                m_sSavePath                     = m_sDefaultPath & "\" & m_sSaveDir
            End if
        End Property
        Public Property Get DefaultDir() 
            DefaultDir = m_sDefaultDir
        End Property
        'SaveDir
        Public Property Let SaveDir(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_sSaveDir                      = p_Value
                m_sSavePath                     = m_sDefaultPath & "\" & m_sSaveDir
            End if
        End Property
        Public Property Get SaveDir() 
            SaveDir = m_sSaveDir
        End Property
        ' DefaultPath       
        Public Property Get DefaultPath() 
            DefaultPath = m_sDefaultPath
        End Property
        ' SavePath       
        Public Property Get SavePath() 
                SavePath = m_sSavePath
        End Property
        ' Prefix
        Public Property Let Prefix(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_sPrefix = p_Value
            End if
        End Property
        Public Property Get Prefix() 
                Prefix = m_sPrefix
        End Property        
        ' Suffix
        Public Property Let Suffix(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_sSuffix = p_Value
            End if
        End Property
        Public Property Get Suffix() 
                Suffix = m_sSuffix
        End Property        
        ' ThumbSuffix
        Public Property Let ThumbSuffix(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_sThumbSuffix = p_Value
            End if
        End Property
        Public Property Get ThumbSuffix() 
                ThumbSuffix = m_sThumbSuffix
        End Property        
        ' Overwrite
        Public Property Let Overwrite(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_bOverwrite = p_Value
            End if
        End Property
        Public Property Get Overwrite() 
                Overwrite = m_bOverwrite
        End Property        
        ' Thumbnail
        Public Property Let Thumbnail(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_bThumbnail = p_Value
            End if
        End Property
        Public Property Get Thumbnail() 
                Thumbnail = m_bThumbnail
        End Property        
        ' OldName
        Public Property Get OldName() 
            OldName = m_sOldName
        End Property
        ' imgName
        Public Property Get imgName() 
            imgName = m_sImgName
        End Property
        ' ImgPath
        Public Property Get ImgPath() 
            ImgPath = m_sImgPath
        End Property
        ' ImgUrl
        Public Property Get ImgUrl() 
            ImgUrl = m_sImgUrl
        End Property
        ' Size
        Public Property Get Size() 
            Size = m_iSize
        End Property
        ' Width
        Public Property Get Width() 
            Width = m_iWidth
        End Property
        ' Height
        Public Property Get Height() 
            Height = m_iHeight
        End Property

        '---------------------------------------------------------------------------
        ' 초기화
        '---------------------------------------------------------------------------
		Private Sub Init()
        End Sub

        '---------------------------------------------------------------------------
        ' Name 			: 
        ' Description 	: 이미지 저장
        ' Return		: 
        '---------------------------------------------------------------------------
        Public Function Save(p_form, p_img_idx, p_file_idx)

            Dim imgName, savePath, thumName
            Dim oldName, newName, ext
            
            oldName = m_oUploadform(p_form).FileName 

            ext = "." & right(oldName,len(oldName)-instr(oldName,".")) 

            If Not IsEmpty(p_img_idx)   Then newName = p_img_idx
            If Not IsEmpty(p_file_idx)  Then newName = newName & "-" & p_file_idx

            ' 접두사/접미사/확장자
            imgName     = m_sPrefix & newName & m_sSuffix & ext      
            thumName    = m_sPrefix & newName & m_sSuffix & m_sThumbSuffix & ext

'디버깅            
' response.write m_oUploadform(p_form).TempFilePath
' response.End
            ' 썸네일 등록
            If m_bThumbnail and True = m_oImage.SetSourceFile(m_oUploadform(p_form).TempFilePath) Then
                savePath = m_sSavePath & "\" & thumName
                Call m_oImage.SaveasThumbnail(savePath, m_oImage.ImageWidth/5, m_oImage.ImageHeight/5, m_bOverwrite, true)
            End If

            ' 저장
            savePath = m_sSavePath & "\" & imgName
            m_oUploadform(p_form).SaveAs  m_sSavePath & "\" & imgName, m_bOverwrite

            ' 프로퍼터 설정
            m_sOldName = oldName
            m_sImgName = imgName
            m_sImgPath = m_sSavePath & "\" & imgName
            m_sImgUrl  = m_sDefaultDir & "/" & m_sSaveDir & "/" & imgName
            m_iSize    = m_oUploadform(p_form).FileLen
            m_iWidth   = m_oUploadform(p_form).ImageWidth
            m_iHeight  = m_oUploadform(p_form).ImageHeight

            Save = imgName
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: 
        ' Description 	: 파일 삭제
        '---------------------------------------------------------------------------
        Public Function Delete(p_filePath)
            
            ' Dim savePath
            
            ' savePath = m_sSavePath & "\" & p_fileName

            ' 파일삭제

            Delete = m_oUploadform.DeleteFile(p_filePath)
            
        End Function

    End Class
%>