# Better Gallery – AI / ML Feature List

## 1. Semantic Search

- CLIP ViT-B/32 embeddings for images and text queries.
- K-NN similarity search inside SQLite (vector extension).

## 2. Automated Content Tagging

- MobileNetV3-Large multi-label classifier.
- AI tags stored with confidence score; user can confirm or delete.

## 3. Similar Image Search

- Re-use CLIP vectors; context-menu “Find Similar”.

## 4. Face Detection & Clustering

- YOLOv5-face → ArcFace embeddings.
- Hierarchical clustering; People view with naming.

## 5. Future / Stretch

- Scene segmentation for background replacement.
- Object counting (e.g., number of people in photo).

### Privacy & Security

- All models run locally, no outbound network calls.
- Optional AES-256 encryption for face embeddings.
