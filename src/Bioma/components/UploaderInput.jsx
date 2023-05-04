import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from "@mui/material";
import { convertToBase64 } from "../../helpers/convertToBase64";
import { useAreaStore } from "../../hooks/useAreaStore";
import '../styles/UploaderInput.css'



function ImageUploader(props) {
    const {formValues, setFormValues} = props.form;

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('Imagen no seleccionada');
    const { isEditing, activeArea } = useAreaStore();
    
    const handleFileUpload = async (file) => {
        // const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setFormValues({...formValues,image: base64 });
        console.log(formValues);
    }

    useEffect(() => {
        if(isEditing) setImage(activeArea.image);
    },[isEditing])

    return (
        <div className="uploadContainer">
            <div className="imageContainer" 
            onClick={() => document.querySelector('.input-field').click()}
            >
               <input required type="file" accept="image/*" className="input-field" hidden 
               onChange={({ target: {files}}) => {
                 files[0] && setFileName(files[0].name)
                 if(files[0] !== undefined ){
                    setImage(URL.createObjectURL(files[0]));
                    handleFileUpload(files[0]);
                 }
               }}/>

               {image 
                ? <img src={image} width={150} height={150} alt={fileName}/>
                :  <>
                   <CloudUploadIcon fontSize="large" color="success"/>
                   <Typography variant="h6">Buscar imagen a subir</Typography>
                   </>
                }
            </div>
            <section className="uploaded-row">
                <InsertDriveFileIcon/>
                <Typography variant="h6" className="upload-content" sx={{ml: 4}}>
                    {fileName}
                </Typography>
                    <Button onClick={() => {setFileName('Imagen no seleccionada'); setImage(null);}}>
                        <DeleteIcon fontSize="large" color="error"/>
                    </Button>
                    
            </section>
        </div>
    )
}

export default ImageUploader;