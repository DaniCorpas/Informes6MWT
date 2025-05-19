//------------------------------------------------------------------------
// Funció per poder fer drag and drop 
//------------------------------------------------------------------------
function enableDragAndDrop() {
    const blocks = document.querySelectorAll('.data-table');

    blocks.forEach(block => {
        block.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.target.classList.add('dragging');
        });

        block.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });

        block.addEventListener('dragover', (event) => {
            event.preventDefault(); // Permitir el drop
            const draggingBlock = document.querySelector('.dragging');
            const container = event.target.closest('.data-table');
            if (container && container !== draggingBlock) {
                const bounding = container.getBoundingClientRect();
                const offset = event.clientY - bounding.top;
                if (offset > bounding.height / 2) {
                    container.parentNode.insertBefore(draggingBlock, container.nextSibling);
                } else {
                    container.parentNode.insertBefore(draggingBlock, container);
                }
            }
        });

        block.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedBlockId = event.dataTransfer.getData('text/plain');
            const draggedBlock = document.getElementById(draggedBlockId);
            const dropTarget = event.target.closest('.data-table');
            if (dropTarget && draggedBlock) {
                dropTarget.parentNode.insertBefore(draggedBlock, dropTarget.nextSibling);
            }
        });
    });
}