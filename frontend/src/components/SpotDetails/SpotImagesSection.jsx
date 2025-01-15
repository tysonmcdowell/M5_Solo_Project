const SpotImagesSection = ({ spotImages }) => {
    if (!spotImages) return <p className="loading-text">Loading images</p>;
    
    // Reordering the images
    let reorderedImages = spotImages.sort((a, b) => b.preview - a.preview);
    
    return (
        <div className="spot-images-grid">
            {reorderedImages.map((image, idx) => (
                <img 
                    className="spot-image" 
                    id={`spot-image-${idx + 1}`} 
                    key={image.id} 
                    src={image.url} 
                    alt={`Spot image ${image.id}`} 
                />
            ))}
        </div>
    );
}

export default SpotImagesSection;
