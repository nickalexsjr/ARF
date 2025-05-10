// Client Type Selector
const typeOptions = document.querySelectorAll('.type-option');
const entitySelector = document.getElementById('entitySelector');

// Form Groups that are conditionally shown
const partnerNameGroup = document.getElementById('partnerNameGroup');
const entityNameGroup = document.getElementById('entityNameGroup');
const partnerRecommendationsGroup = document.getElementById('partnerRecommendationsGroup');
const jointRecommendationsGroup = document.getElementById('jointRecommendationsGroup');
const entityRecommendationsGroup = document.getElementById('entityRecommendationsGroup');

// Yes/No Toggle
const flowchartRequiredToggle = document.getElementById('flowchartRequired');
const flowchartStatus = document.getElementById('flowchartStatus');

// Projection Length Dropdown
const projectionDateLength = document.getElementById('projectionDateLength');
const otherProjectionLength = document.getElementById('otherProjectionLength');

// Buttons
const saveBtn = document.getElementById('saveBtn');
const exportWordBtn = document.getElementById('exportWordBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const resetBtn = document.getElementById('resetBtn');

// Handle Client Type Selection
typeOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from all options
        typeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        const clientType = this.getAttribute('data-type');
        
        // Hide all conditional sections
        partnerNameGroup.style.display = 'none';
        entityNameGroup.style.display = 'none';
        partnerRecommendationsGroup.style.display = 'none';
        jointRecommendationsGroup.style.display = 'none';
        entityRecommendationsGroup.style.display = 'none';
        entitySelector.classList.remove('show');
        
        // Show sections based on client type
        if (clientType === 'couple') {
            partnerNameGroup.style.display = 'block';
            partnerRecommendationsGroup.style.display = 'block';
            jointRecommendationsGroup.style.display = 'block';
        } else if (clientType === 'entity') {
            entityNameGroup.style.display = 'block';
            entityRecommendationsGroup.style.display = 'block';
            entitySelector.classList.add('show');
        }
    });
});

// Handle Flowchart Toggle
flowchartRequiredToggle.addEventListener('change', function() {
    flowchartStatus.textContent = this.checked ? 'Yes' : 'No';
});

// Handle Projection Length Dropdown
projectionDateLength.addEventListener('change', function() {
    otherProjectionLength.style.display = this.value === 'other' ? 'block' : 'none';
});

// Handle ROA/ROSIA Requirements Display
document.querySelectorAll('input[name="requiredDocs"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Check if all required docs are selected
        const allChecked = Array.from(document.querySelectorAll('input[name="requiredDocs"]')).every(box => box.checked);
        
        if (allChecked) {
            document.getElementById('roaRequirements').style.display = 'block';
            document.getElementById('rosiaRequirements').style.display = 'block';
        } else {
            document.getElementById('roaRequirements').style.display = 'none';
            document.getElementById('rosiaRequirements').style.display = 'none';
        }
    });
});

// Export to Word functionality
exportWordBtn.addEventListener('click', function() {
    alert('This would export the form data to a Word document. In a production environment, this would use a library like docx.js or server-side processing.');
});

// Export to PDF functionality
exportPdfBtn.addEventListener('click', function() {
    alert('This would export the form data to a PDF. In a production environment, this would use a library like jsPDF or server-side processing.');
    // Example using browser print to PDF functionality
    window.print();
});

// Save Draft functionality
saveBtn.addEventListener('click', function() {
    // In a real implementation, this would save form data to localStorage or to a server
    alert('Form data has been saved as a draft!');
});

// Reset Form functionality
resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        // Reset form fields
        document.querySelectorAll('input[type="text"], input[type="date"], input[type="number"], textarea').forEach(field => {
            field.value = '';
        });
        
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset client type selection
        typeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Hide conditional sections
        partnerNameGroup.style.display = 'none';
        entityNameGroup.style.display = 'none';
        partnerRecommendationsGroup.style.display = 'none';
        jointRecommendationsGroup.style.display = 'none';
        entityRecommendationsGroup.style.display = 'none';
        entitySelector.classList.remove('show');
        document.getElementById('roaRequirements').style.display = 'none';
        document.getElementById('rosiaRequirements').style.display = 'none';
        
        // Reset other UI elements
        flowchartRequiredToggle.checked = false;
        flowchartStatus.textContent = 'No';
        projectionDateLength.value = '5';
        otherProjectionLength.style.display = 'none';
        
        alert('Form has been reset!');
    }
});
