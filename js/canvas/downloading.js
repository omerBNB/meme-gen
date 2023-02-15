function downloadCanvas(elLink) {
    // Protect the image soo attacker could not download imgs from diff domain
    const data = gCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
    // This protects users from having private data exposed by using images
    // to pull information from remote web sites without permission.
    elLink.href = data
    elLink.download = 'my-img.jpg'
}