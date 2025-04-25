const cloudName = import.meta.env.VITE_CLOUD_NAME;

export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("folder", "posts");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Error al subir la imagen");
    }
  
    const data = await response.json();
    return data.secure_url; 
};
  