document.addEventListener('DOMContentLoaded', function() {
    // Client Status Radio Buttons
    const newClientRadio = document.getElementById('newClient');
    const existingClientRadio = document.getElementById('existingClient');
    
    // Client Type Checkboxes
    const singleClientCheckbox = document.getElementById('singleClient');
    const coupleClientCheckbox = document.getElementById('coupleClient');
    const dependantsClientCheckbox = document.getElementById('dependantsClient');
    const entityClientCheckbox = document.getElementById('entityClient');
    const entitySelector = document.getElementById('entitySelector');
    
    // Entity Type Checkboxes
    const entitySMSFCheckbox = document.getElementById('entitySMSF');
    const entityTrustCheckbox = document.getElementById('entityTrust');
    const entityCompanyCheckbox = document.getElementById('entityCompany');
    
    // Form Groups that are conditionally shown
    const partnerNameGroup = document.getElementById('partnerNameGroup');
    const entityNameGroup = document.getElementById('entityNameGroup');
    const partnerRecommendationsGroup = document.getElementById('partnerRecommendationsGroup');
    const jointRecommendationsGroup = document.getElementById('jointRecommendationsGroup');
    const dependantsRecommendationsGroup = document.getElementById('dependantsRecommendationsGroup');
    const entityRecommendationsContainer = document.getElementById('entityRecommendationsContainer');
    
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
    
    // Set up checkbox visual selection effect
    document.querySelectorAll('.checkbox-item').forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        
        if (checkbox) {
            // Update visual selection on checkbox change
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
                updateFormBasedOnSelections();
            });
            
            // Also make the label and checkbox item interactive
            item.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        }
    });
    
    // Handle entity checkbox to show entity selector
    entityClientCheckbox.addEventListener('change', function() {
        if (this.checked) {
            entitySelector.style.display = 'block';
        } else {
            entitySelector.style.display = 'none';
            // Uncheck entity type checkboxes when entity is unchecked
            entitySMSFCheckbox.checked = false;
            entityTrustCheckbox.checked = false;
            entityCompanyCheckbox.checked = false;
            
            document.querySelectorAll('.checkbox-item.entity-types').forEach(item => {
                item.classList.remove('selected');
            });
        }
        updateFormBasedOnSelections();
    });
    
    // Function to update entity recommendation sections
    function updateEntityRecommendations() {
        // Clear existing entity recommendation sections
        entityRecommendationsContainer.innerHTML = '';
        
        // If entity client is selected, create recommendation sections based on entity types
        if (entityClientCheckbox.checked) {
            // Show entity name field
            entityNameGroup.style.display = 'block';
            
            // Create recommendation sections for selected entity types
            if (entitySMSFCheckbox.checked) {
                createEntityRecommendationSection('SMSF');
            }
            
            if (entityTrustCheckbox.checked) {
                createEntityRecommendationSection('Trust');
            }
            
            if (entityCompanyCheckbox.checked) {
                createEntityRecommendationSection('Company');
            }
            
            // If no specific entity types are selected, show a generic entity recommendation section
            if (!entitySMSFCheckbox.checked && !entityTrustCheckbox.checked && !entityCompanyCheckbox.checked) {
                createEntityRecommendationSection('Entity');
            }
        } else {
            // Hide entity name field if entity client is not selected
            entityNameGroup.style.display = 'none';
        }
    }
    
    // Helper function to create entity recommendation sections
    function createEntityRecommendationSection(entityType) {
        const sectionId = `${entityType.toLowerCase()}RecommendationsGroup`;
        const sectionHTML = `
            <div class="form-group" id="${sectionId}">
                <label for="${entityType.toLowerCase()}Recommendations">${entityType} Recommendations:</label>
                <textarea id="${entityType.toLowerCase()}Recommendations" name="${entityType.toLowerCase()}Recommendations" 
                    placeholder="Enter recommendations for ${entityType}"></textarea>
            </div>
        `;
        entityRecommendationsContainer.insertAdjacentHTML('beforeend', sectionHTML);
    }
    
    // Add event listeners for entity type checkboxes
    entitySMSFCheckbox.addEventListener('change', updateEntityRecommendations);
    entityTrustCheckbox.addEventListener('change', updateEntityRecommendations);
    entityCompanyCheckbox.addEventListener('change', updateEntityRecommendations);
    
    // Function to update form based on selected client types
    function updateFormBasedOnSelections() {
        // Update partner-related fields based on couple selection
        partnerNameGroup.style.display = coupleClientCheckbox.checked ? 'block' : 'none';
        partnerRecommendationsGroup.style.display = coupleClientCheckbox.checked ? 'block' : 'none';
        jointRecommendationsGroup.style.display = coupleClientCheckbox.checked ? 'block' : 'none';
        
        // Update dependants recommendations based on dependants selection
        dependantsRecommendationsGroup.style.display = dependantsClientCheckbox.checked ? 'block' : 'none';
        
        // Update entity recommendations
        updateEntityRecommendations();
    }
    
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
            
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            
            // Reset client type selection
            document.querySelectorAll('.checkbox-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Hide conditional sections
            partnerNameGroup.style.display = 'none';
            entityNameGroup.style.display = 'none';
            partnerRecommendationsGroup.style.display = 'none';
            jointRecommendationsGroup.style.display = 'none';
            dependantsRecommendationsGroup.style.display = 'none';
            entitySelector.style.display = 'none';
            document.getElementById('roaRequirements').style.display = 'none';
            document.getElementById('rosiaRequirements').style.display = 'none';
            entityRecommendationsContainer.innerHTML = '';
            
            // Reset other UI elements
            flowchartRequiredToggle.checked = false;
            flowchartStatus.textContent = 'No';
            projectionDateLength.value = 'lifeExpectancy';
            otherProjectionLength.style.display = 'none';
            
            alert('Form has been reset!');
        }
    });
    
    // Initial form update
    updateFormBasedOnSelections();
});
