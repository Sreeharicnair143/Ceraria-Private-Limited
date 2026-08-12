# pyrefly: ignore [missing-import]
import cv2
import numpy as np
from collections import Counter

# Load the image
img = cv2.imread('public/assets/images/logo-icon.jpg', cv2.IMREAD_UNCHANGED)
if img is None:
    print("Error loading image")
    exit(1)

# Ensure it has an alpha channel
if img.shape[2] == 3:
    img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

h, w = img.shape[:2]

# The image is likely a logo in the center, with a square frame around it, on a solid background.
# We will use floodFill from the edges to make the background transparent.
mask = np.zeros((h+2, w+2), np.uint8)
cv2.floodFill(img, mask, (0,0), (0,0,0,0), loDiff=(5,5,5,5), upDiff=(5,5,5,5))

# Now to remove the frame. Let's find contours.
# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGRA2GRAY)
# Threshold
_, thresh = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

if contours:
    # Find the largest contour (the frame)
    largest_contour = max(contours, key=cv2.contourArea)
    x, y, w_c, h_c = cv2.boundingRect(largest_contour)
    print(f"Bounding rect of largest contour (likely the frame): {x},{y},{w_c},{h_c}")
    
    # We can just extract the inner part of the frame, or we can use another method
    # Let's write the modified image to see if floodfill worked.
    cv2.imwrite('public/assets/images/logo-icon-transparent.png', img)
    print("Saved logo-icon-transparent.png")
else:
    print("No contours found.")
