// handleGesture.js
import { useRef } from 'react';

const useHandleGesture = (tabs, setActiveTab) => {
    const lastGestureTime = useRef(0); // Thời gian gạt tay cuối cùng

    const handleGesture = (event) => {
        const currentTime = Date.now();
        
        // Kiểm tra thời gian giữa hai lần gạt
        if (currentTime - lastGestureTime.current < 300) return; // Nếu gạt quá nhanh thì không thực hiện gì

        if (event.nativeEvent.translationX > 30) {
            // Gạt tay qua phải
            setActiveTab(prev => {
                const currentIndex = tabs.indexOf(prev);
                lastGestureTime.current = currentTime; // Cập nhật thời gian gạt
                return currentIndex > 0 ? tabs[currentIndex - 1] : prev;
            });
        } else if (event.nativeEvent.translationX < -30) {
            // Gạt tay qua trái
            setActiveTab(prev => {
                const currentIndex = tabs.indexOf(prev);
                lastGestureTime.current = currentTime; // Cập nhật thời gian gạt
                return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : prev;
            });
        }
    };

    return handleGesture;
};

export default useHandleGesture;
