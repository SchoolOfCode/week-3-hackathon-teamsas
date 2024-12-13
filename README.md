.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
}

.frame {
  text-align: center;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   /* Prevents the frame from being too wide */
}

.images {
  display: flex;
  gap: 15px;
  justify-content: center; /* Centers the images */
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allows images to wrap if the screen is too narrow */
}

.dogImage {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.infoBox {
  font-size: 1.2rem;
  color: #333;
  font-family: Arial, sans-serif;
  
}
