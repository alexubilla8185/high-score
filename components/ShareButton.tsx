import React from 'react';

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const ShareButton: React.FC = () => {
    const handleShare = async () => {
        const shareData = {
            title: 'Higher Please Quiz',
            text: `Challenge your mind with this surreal, AI-powered quiz. Can you get a higher score?`,
            url: window.location.origin,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support Web Share API
                navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            alert('Could not share. Please copy the link manually.');
        }
    };
    
    return (
        <button
            onClick={handleShare}
            aria-label="Share this app"
            className="w-12 h-12 bg-gray-200 dark:bg-neutral-800/80 rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg hover:scale-110 transition-all transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
        >
            <ShareIcon />
        </button>
    );
};

export default ShareButton;
