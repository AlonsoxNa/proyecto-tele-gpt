import React, { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import "./MediaUpload.css";

interface MediaState {
file: File | null;
    previewUrl: string;
    fileType: string;
}

const MediaUpload: React.FC = () => {
    const [media, setMedia] = useState<MediaState>({
        file: null,
        previewUrl: "",
        fileType: "",
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        handleFile(file);
    };

    const handleFile = (file: File | null) => {
        if (file) {
            setMedia({
                file: file,
                previewUrl: URL.createObjectURL(file),
                fileType: file.type.split("/")[0],
            });
        }
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Necesario para permitir el drop
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!media.file) {
            alert("Por favor selecciona un archivo antes de subirlo.");
            return;
        }

        const formData = new FormData();
        formData.append("media", media.file);

        try {
            const response = await fetch("/upload-media-url", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Archivo subido con éxito: " + data.filePath);
            } else {
                alert("Error al subir el archivo.");
            }
        } catch (error) {
            console.error("Error al subir el archivo:", error);
        }
    };

    return (
        <div
            className="form-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    style={{ display: "none" }} // Oculta el input file tradicional
                />
                <div
                    className="drop-area"
                    onClick={() =>
                        document
                            .querySelector<HTMLInputElement>(
                                'input[type="file"]'
                            )!
                            .click()
                    }
                >
                    Subir archivo
                </div>
                {media.previewUrl && media.fileType === "image" && (
                    <img
                        src={media.previewUrl}
                        alt="Preview"
                        className="preview-img"
                    />
                )}
                {media.previewUrl && media.fileType === "video" && (
                    <video className="preview-img" controls>
                        <source src={media.previewUrl} type="video/mp4" />
                        Tu navegador no soporta vídeos HTML5.
                    </video>
                )}
                <button type="submit">Subir archivo</button>
            </form>
        </div>
    );
};

export default MediaUpload;
