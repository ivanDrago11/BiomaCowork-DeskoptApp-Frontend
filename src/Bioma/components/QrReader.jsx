import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { useUiStore } from '../../hooks/useUiStore'
import { useUserStore } from '../../hooks/useUserStore';
import Swal from 'sweetalert2';

export const QrReader = () => {
    
    const [scanResult, setScanResult ] = useState(null);
    const { page } = useUiStore();
    const { users } = useUserStore();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 400, 
                height: 400 
            },
            fps: 60,
        });
    
        scanner.render(success, error);
        function success(result) {
            scanner.pause();
            let found = 0;
            users.map((valor) => {
                if(valor.id == result ){
                    if(valor.acceso == 'Permitido'){
                        found = 1;
                        Swal.fire('Acceso Concedido', 'Un Gusto Volverte a ver ' + valor.name, 'success');
                    }else if(valor.acceso == 'Denegado'){
                        found = 1;
                        Swal.fire('Acceso Denegado', 'Habla con un supervisor para obtener mas información ' + valor.name, 'error');
                    }
                }
            });
            if(found == 0){
                Swal.fire('Usuario no Encontrado', 'Revisa tu codigo QR', 'warning'); 
            }
            scanner.resume();
        }
        function error(err) {
            console.warm(err);
        }
    }, [page])
    

    
    console.log('QR Ejecutado');
    console.log(page);

    return (
        <div style={{width: "800px"}}>
            <h1 style={{textAlign: "center"}}>Muestra tu Codigo QR</h1>
            { scanResult
            ? <div>Success: <a href={"http://"+scanResult}>{scanResult}</a></div>
            : <div id="reader"></div>
            }
            <div id="reader"></div>
        </div>
    );

}