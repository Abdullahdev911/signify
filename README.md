# **Signify – Real-Time Sign Language Interpreter**

Signify is a mobile application built to bridge the communication gap between the Deaf/Hard-of-Hearing community and hearing individuals. It provides **real-time ASL gesture recognition**, **text-to-gesture translation**, **gesture quizzes**, and an **AI-powered ASL assistant** — all wrapped in a modern React Native experience.

---

## 🚀 **Features**

### ✋ **1. Real-Time Gesture-to-Text/Speech**

* Uses **React Native Vision Camera** to capture frames.
* Frames sent through **WebSocket** to a **FastAPI backend**.
* Backend runs **MediaPipe Hand Tracking** + a **custom CNN model** to recognize ASL alphabet gestures.
* App builds the sentence in real time and can read it aloud.

---

### 🔤 **2. Text-to-Gesture Conversion**

* Users can type any word.
* App fetches gesture images from **AWS S3** using a serverless **AWS Lambda** + **API Gateway** endpoint.
* Displays gesture images individually or in slideshow mode.

---

### 🧠 **3. AI-powered Ask-ASL Chat**

* Integrated with **Gemini 1.5 Flash API**.
* Users can ask ASL-related questions (How to sign a word, cultural rules, mistakes, etc.).
* Markdown-rendered, beautifully formatted AI responses.
* Chat history shown in a clean message UI.

---

### 📝 **4. Gesture Quiz**

* Shows a random word.
* User performs signs letter-by-letter.
* Real-time backend recognition validates each gesture.
* Encourages learning & practice through gamification.

---

### 🎨 **5. Modern UI/UX**

* Theme-aware (light/dark) using custom **Theme Context**.
* Smooth card layouts, clean typography, and intuitive navigation.
* React Native Tailwind-like styles for consistency.

---

## 🏗️ **Architecture Overview**

### **Frontend (Mobile App)**

* React Native (Expo Dev Build)
* React Native Vision Camera (real-time frame capture)
* Expo Router
* Clerk.dev Authentication
* Gemini 1.5 Flash API (AI assistant)
* Context API for theming

### **Backend**

* FastAPI WebSocket server
* MediaPipe for hand landmarks
* TensorFlow CNN model (26 ASL alphabet gestures)
* Deployed via Render / local server

### **Serverless ASL Gesture API**

* AWS Lambda (Node/Python)
* AWS DynamoDB (letter → image mapping)
* AWS S3 (gesture image storage)
* API Gateway (REST endpoints)

---

## 🧪 **Tech Stack**

### **Frontend**

* React Native (Expo)
* React Native Vision Camera
* Expo Router
* Clerk.dev Authentication
* React Native Markdown Display
* Context API

### **Backend**

* FastAPI
* TensorFlow / TFLite
* MediaPipe
* WebSockets

### **Cloud**

* AWS Lambda
* AWS DynamoDB
* AWS S3
* AWS API Gateway

### **AI**

* Gemini 1.5 Flash API
* Custom CNN for ASL gesture prediction

---

## 📱 **Screenshots**
![SignifySrcShot#3](https://github.com/user-attachments/assets/5e564be3-e637-456a-b999-ad81f6b1172b)
![SignifySrcShot#1](https://github.com/user-attachments/assets/4cc1bc1a-1df6-4ed9-8a8c-9ec810521dd4)




---

## 📦 **Installation & Setup**

### **1. Clone the repository**

```bash
git clone https://github.com/yourusername/Signify.git
cd Signify
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Add environment variables**

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### **4. Start the Expo project**

```bash
npx expo start
```

### ⚠️ *Note: Requires a **custom Expo Dev Build** due to native dependencies.*

---

## 🧠 **Model Training (ASL Recognition)**

* Dataset: 26 ASL alphabet signs
* Preprocessing: MediaPipe hand landmarks
* Model: CNN built in TensorFlow
* Exported to `.h5` and converted to TFLite
* Optimized for fast inference

---

## 🔌 **WebSocket Backend Setup**

Install requirements:

```bash
pip install fastapi uvicorn mediapipe tensorflow numpy
```

Run the server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🛡️ **Authentication**

* Implemented using **Clerk.dev**
* Google OAuth & Email/Password supported

---



## 🤝 **Contributing**

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to add.

