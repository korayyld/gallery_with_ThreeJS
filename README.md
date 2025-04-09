# 🎨 3D Modern Art Gallery – Computer Graphics Project

This is a Web-based 3D Modern Art Gallery developed . The project aims to simulate an immersive and interactive virtual gallery experience using **Three.js**.

---

## 🧱 Features

### 🏛️ Gallery Components
- **Chairs**: Symmetrically placed, custom-colored seating objects.
- **Sculptures**: Includes rotating geometric forms like **Torus Knot**, **Icosahedron**, and **Octahedron**.
- **Framed Artworks**: Textured images displayed on gallery walls.
- **Skybox Environment**: A 360° panoramic skybox gives the scene a realistic background.

### 🧩 Geometry Types Used
- `BoxGeometry`: Pedestals, chair seats, and artwork frames.
- `PlaneGeometry`: Walls, floor, and canvas surfaces.
- `TorusKnotGeometry`, `IcosahedronGeometry`: Artistic sculptures.
- `CylinderGeometry`: Bases and supports.

### 💡 Lighting
- **Multiple Lights**: General illumination for the entire scene.
- **Spotlights**: Highlighting individual sculptures and artworks.
- **Accent Lights**: Colorful point lights for ambiance and modern aesthetics.

### 🎨 Texture & Material
- High-res **texture mapping** for paintings, floor, and metallic sculptures.
- Environment mapping for realistic **metallic reflections**.
- Custom shaders for glow effects.

### 🌀 Animations
- Continuous **rotation animations** for sculptures using `requestAnimationFrame`.
- Dynamic scene atmosphere with subtle motion and effects.

---

## 📂 File Structure

- `index.html`: Entry point with scene container and Three.js links.
- `app.js`: Contains full scene setup – geometries, textures, lighting, animation logic, and shader code.
- `/public`: Texture image files used for paintings and materials.

---

## 🎨 Scene Design Goals

- **Symmetry & Balance**: Carefully arranged objects to enhance visual flow.
- **Immersion**: Use of skybox, lighting, and reflection to create depth.
- **Modern Aesthetic**: Sleek shapes, vibrant lighting, and minimalistic approach.

---

## 🛠️ Technologies Used

- [Three.js](https://threejs.org/) – 3D Rendering
- JavaScript (ES6)
- HTML5 & WebGL

---


## 📌 Notes

- This project was purely academic and is not intended for commercial use.
- All texture sources are acknowledged in the project files.

---

