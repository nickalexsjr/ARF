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
    const saveToXplanBtnBottom = document.getElementById('saveToXplanBtnBottom');
    const emailDocumentBtnBottom = document.getElementById('emailDocumentBtnBottom');
    
    // Draft functionality
    const draftSelector = document.getElementById('draftSelector');
    const loadDraftBtn = document.getElementById('loadDraftBtn');
    const deleteDraftBtn = document.getElementById('deleteDraftBtn');
    const saveDraftModal = document.getElementById('saveDraftModal');
    const draftNameInput = document.getElementById('draftName');
    const confirmSaveDraftBtn = document.getElementById('confirmSaveDraft');
    const cancelSaveDraftBtn = document.getElementById('cancelSaveDraft');
    const closeModal = document.querySelector('.close');
    const autoSaveIndicator = document.getElementById('autoSaveIndicator');
    
    // Alternative platforms checkbox
    const paraplannerCompareCheckbox = document.getElementById('paraplannerCompare');
    const alternativePlatformsTextarea = document.getElementById('alternativePlatforms');
    
   // Alternative strategies dropdown functionality
const altStrategiesDropdownBtn = document.getElementById('altStrategiesDropdownBtn');
const altStrategiesDropdown = document.getElementById('altStrategiesDropdown');
const addSelectedStrategiesBtn = document.getElementById('addSelectedStrategies');
const cancelStrategiesSelectionBtn = document.getElementById('cancelStrategiesSelection');
const alternativeStrategiesTextarea = document.getElementById('alternativeStrategies');

// Simple toggle dropdown
if (altStrategiesDropdownBtn) {
    altStrategiesDropdownBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent any default action
        e.stopPropagation(); // Stop event bubbling
        
        // Toggle display
        if (altStrategiesDropdown.style.display === 'none' || !altStrategiesDropdown.style.display) {
            altStrategiesDropdown.style.display = 'block';
            console.log('Dropdown opened');
        } else {
            altStrategiesDropdown.style.display = 'none';
            console.log('Dropdown closed');
        }
    });
}

// Add selected strategies
if (addSelectedStrategiesBtn) {
    addSelectedStrategiesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const selectedStrategies = [];
        const checkboxes = altStrategiesDropdown.querySelectorAll('input[type="checkbox"]:checked');
        
        checkboxes.forEach(checkbox => {
            selectedStrategies.push(checkbox.value);
        });

        if (selectedStrategies.length > 0) {
            const currentValue = alternativeStrategiesTextarea.value;
            const newStrategies = selectedStrategies.join('\n\n');
            
            if (currentValue && !currentValue.endsWith('\n')) {
                alternativeStrategiesTextarea.value = currentValue + '\n\n' + newStrategies;
            } else {
                alternativeStrategiesTextarea.value = currentValue + newStrategies;
            }
            
            // Uncheck all checkboxes
            altStrategiesDropdown.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Hide dropdown
            altStrategiesDropdown.style.display = 'none';
            
            // Trigger auto-save if you have it
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        }
    });
}

// Cancel selection
if (cancelStrategiesSelectionBtn) {
    cancelStrategiesSelectionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Uncheck all checkboxes
        altStrategiesDropdown.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Hide dropdown
        altStrategiesDropdown.style.display = 'none';
    });
}

// Close dropdown when clicking outside (optional)
document.addEventListener('click', function(e) {
    if (altStrategiesDropdown && altStrategiesDropdownBtn) {
        if (!altStrategiesDropdown.contains(e.target) && !altStrategiesDropdownBtn.contains(e.target)) {
            altStrategiesDropdown.style.display = 'none';
        }
    }
});
    
    // Product options
    const productOptions = [
        'Centric IDPS',
        'Centric Super Choice Accumulation',
        'Centric Super One Accumulation',
        'Centric Super Choice Pension',
        'Centric Super One Pension',
        'CFS Edge IDPS',
        'CFS Edge Super',
        'CFS Edge Pension',
        'BT Panorama IDPS',
        'BT Panorama Pension',
        'BT Panorama Super',
        'LifeFocus Wholesale Investment',
        'LifeFocus Wholesale Super',
        'LifeFocus Wholesale Pension',
        'LifeFocus Private Super',
        'LifeFocus Private Pension',
        'LifeFocus Private Investment',
        'Custom'
    ];
    
    // Risk profile options
    const riskProfiles = ['Conservative', 'Defensive', 'Moderate', 'Balanced', 'Growth', 'High Growth', 'Growth Plus', 'Custom'];
    
    // Product counter for unique IDs
    let productCounter = 0;
    let autoSaveTimeout;
    
    // Initialize draft functionality
    initializeDraftFunctionality();
    
    // Set up auto-save
    setupAutoSave();
    
    // Check and display compliance warnings
    checkCriticalCompliance();
    displayComplianceWarnings();
    
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
                triggerAutoSave();
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
            
            document.querySelectorAll('.entity-types .checkbox-item').forEach(item => {
                item.classList.remove('selected');
            });
        }
        updateFormBasedOnSelections();
    });
    
    // Function to create searchable dropdown
    function createSearchableDropdown(inputId, options, onChange) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'searchable-select';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-list';
        wrapper.appendChild(dropdown);
        
        // Populate dropdown
        options.forEach(option => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = option;
            item.addEventListener('click', function() {
                input.value = option;
                dropdown.classList.remove('active');
                if (onChange) onChange(option);
                triggerAutoSave();
            });
            dropdown.appendChild(item);
        });
        
        // Show/hide dropdown
        input.addEventListener('focus', function() {
            dropdown.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            setTimeout(() => dropdown.classList.remove('active'), 200);
        });
        
        // Filter options
        input.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const items = dropdown.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? 'block' : 'none';
            });
            dropdown.classList.add('active');
            triggerAutoSave();
        });
    }
    
    // Function to create product recommendation item
    function createProductRecommendation(clientId, clientName, productIndex) {
        const productId = `${clientId}_product_${productIndex}`;
        
        const productHTML = `
            <div class="product-item" id="${productId}">
                <div class="product-header">
                    <h5>Product ${productIndex + 1}</h5>
                    ${productIndex > 0 ? `<button type="button" class="btn btn-danger btn-sm" onclick="removeProduct('${productId}')">Remove</button>` : ''}
                </div>
                
                <div class="grid-3-custom">
                    <div class="form-group">
                        <label for="${productId}_name">Product Name:</label>
                        <input type="text" id="${productId}_name" name="${productId}_name" placeholder="Type to search products">
                    </div>
                    <div class="form-group custom-input" id="${productId}_custom_group" style="display: none;">
                        <label for="${productId}_custom">Custom Product:</label>
                        <input type="text" id="${productId}_custom" name="${productId}_custom" placeholder="Enter custom product name">
                    </div>
                </div>
                
                <div class="grid-2">
                    <div class="form-group">
                        <label for="${productId}_investment">Product Investment/s:</label>
                        <textarea id="${productId}_investment" name="${productId}_investment" placeholder="Enter investment details (can list multiple investments)" style="min-height: 60px; resize: vertical;"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="${productId}_cash">Cash Preference:</label>
                        <input type="text" id="${productId}_cash" name="${productId}_cash" placeholder="Enter cash preference amount">
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="yes-no-label">
                        <label for="${productId}_tranching">Tranching:</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="${productId}_tranching" name="${productId}_tranching">
                            <span class="slider"></span>
                        </label>
                        <span id="${productId}_tranching_status">No</span>
                    </div>
                </div>
                
                <div class="tranching-details" id="${productId}_tranching_details" style="display: none;">
                    <div class="form-group">
                        <label for="${productId}_tranching_text">Tranching Details:</label>
                        <textarea id="${productId}_tranching_text" name="${productId}_tranching_text" placeholder="Enter tranching details"></textarea>
                    </div>
                </div>
                
                <div class="mda-section" id="${productId}_mda_section" style="display: none;">
                    <div class="form-group">
                        <div class="yes-no-label">
                            <label for="${productId}_mda">MDA:</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="${productId}_mda" name="${productId}_mda">
                                <span class="slider"></span>
                            </label>
                            <span id="${productId}_mda_status">No</span>
                        </div>
                    </div>
                    
                    <div class="form-group" id="${productId}_investment_options" style="display: none;">
                        <label for="${productId}_investment_option">Investment Option:</label>
                        <select id="${productId}_investment_option" name="${productId}_investment_option">
                            <option value="">Select investment option</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
        
        return productHTML;
    }
    
    // Function to remove product
    window.removeProduct = function(productId) {
        const element = document.getElementById(productId);
        if (element) {
            element.remove();
            triggerAutoSave();
        }
    };
    
    // Function to update recommendation sections based on selections
    function updateRecommendationSections() {
        const container = document.getElementById('recommendationsSectionsContainer');
        container.innerHTML = '';
        
        // Get client names
        const clientName = document.getElementById('clientName').value || 'Client 1';
        const partnerName = document.getElementById('partnerName').value || 'Client 2';
        
        // Add client recommendations if single or couple is selected
        if (singleClientCheckbox.checked || coupleClientCheckbox.checked) {
            const clientRecommendationHTML = `
                <div class="form-group">
                    <label for="clientRecommendations">${clientName} Recommendations/Scope:</label>
                    <textarea id="clientRecommendations" name="clientRecommendations" 
                        placeholder="Enter recommendations for ${clientName}"></textarea>
                </div>
                
                <div class="product-recommendations">
                    <h4>Product Recommendations - ${clientName}</h4>
                    <div id="client1_products">
                        ${createProductRecommendation('client1', clientName, 0)}
                    </div>
                    <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('client1', '${clientName}')">
                        <i class="fas fa-plus"></i> Add Product
                    </button>
                </div>
                
                <div class="risk-profile-section">
                    <h4>Risk Profile - ${clientName}</h4>
                    <div class="form-group">
                        <label for="riskProfile1">Risk Profile:</label>
                        <select id="riskProfile1" name="riskProfile1">
                            <option value="">Select Risk Profile</option>
                            <option value="conservative">Conservative</option>
                            <option value="defensive">Defensive</option>
                            <option value="moderate">Moderate</option>
                            <option value="balanced">Balanced</option>
                            <option value="growth">Growth</option>
                            <option value="highGrowth">High Growth</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', clientRecommendationHTML);
        }
        
        // Add partner recommendations if couple is selected
        if (coupleClientCheckbox.checked) {
            const partnerRecommendationHTML = `
                <div class="form-group">
                    <label for="partnerRecommendations">${partnerName} Recommendations/Scope:</label>
                    <textarea id="partnerRecommendations" name="partnerRecommendations" 
                        placeholder="Enter recommendations for ${partnerName}"></textarea>
                </div>
                
                <div class="product-recommendations">
                    <h4>Product Recommendations - ${partnerName}</h4>
                    <div id="client2_products">
                        ${createProductRecommendation('client2', partnerName, 0)}
                    </div>
                    <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('client2', '${partnerName}')">
                        <i class="fas fa-plus"></i> Add Product
                    </button>
                </div>
                
                <div class="risk-profile-section">
                    <h4>Risk Profile - ${partnerName}</h4>
                    <div class="form-group">
                        <label for="riskProfile2">Risk Profile:</label>
                        <select id="riskProfile2" name="riskProfile2">
                            <option value="">Select Risk Profile</option>
                            <option value="conservative">Conservative</option>
                            <option value="defensive">Defensive</option>
                            <option value="moderate">Moderate</option>
                            <option value="balanced">Balanced</option>
                            <option value="growth">Growth</option>
                            <option value="highGrowth">High Growth</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="jointRecommendations">Joint Recommendations/Scope:</label>
                    <textarea id="jointRecommendations" name="jointRecommendations" 
                        placeholder="Enter joint recommendations"></textarea>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', partnerRecommendationHTML);
        }
        
        // Add entity recommendations
        if (entityClientCheckbox.checked) {
            const entityName = document.getElementById('entityName').value || 'Entity';
            
            if (entitySMSFCheckbox.checked) {
                addEntityRecommendation('SMSF', entityName);
            }
            
            if (entityTrustCheckbox.checked) {
                addEntityRecommendation('Trust', entityName);
            }
            
            if (entityCompanyCheckbox.checked) {
                addEntityRecommendation('Company', entityName);
            }
            
            if (!entitySMSFCheckbox.checked && !entityTrustCheckbox.checked && !entityCompanyCheckbox.checked) {
                addEntityRecommendation('Entity', entityName);
            }
        }
        
        // Add dependants recommendations if selected
        if (dependantsClientCheckbox.checked) {
            const dependantsRecommendationHTML = `
                <div class="form-group">
                    <label for="dependantsRecommendations">Dependants Recommendations/Scope:</label>
                    <textarea id="dependantsRecommendations" name="dependantsRecommendations" 
                        placeholder="Enter recommendations for dependants"></textarea>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', dependantsRecommendationHTML);
        }
        
        // Initialize all product dropdowns and event listeners
        setTimeout(() => {
            initializeProductFeatures();
            setupAutoSaveForNewElements();
        }, 100);
    }
    
    // Helper function to add entity recommendation sections
    function addEntityRecommendation(entityType, entityName) {
        const container = document.getElementById('recommendationsSectionsContainer');
        const entityId = entityType.toLowerCase();
        
        const entityRecommendationHTML = `
            <div class="form-group">
                <label for="${entityId}Recommendations">${entityType} - ${entityName} Recommendations/Scope:</label>
                <textarea id="${entityId}Recommendations" name="${entityId}Recommendations" 
                    placeholder="Enter recommendations for ${entityType}"></textarea>
            </div>
            
            <div class="product-recommendations">
                <h4>Product Recommendations - ${entityType} - ${entityName}</h4>
                <div id="${entityId}_products">
                    ${createProductRecommendation(entityId, entityName, 0)}
                </div>
                <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('${entityId}', '${entityName}')">
                    <i class="fas fa-plus"></i> Add Product
                </button>
            </div>
            
            <div class="risk-profile-section">
                <h4>Risk Profile - ${entityType} - ${entityName}</h4>
                <div class="form-group">
                    <label for="riskProfile${entityId}">Risk Profile:</label>
                    <select id="riskProfile${entityId}" name="riskProfile${entityId}">
                        <option value="">Select Risk Profile</option>
                        <option value="conservative">Conservative</option>
                        <option value="defensive">Defensive</option>
                        <option value="moderate">Moderate</option>
                        <option value="balanced">Balanced</option>
                        <option value="growth">Growth</option>
                        <option value="highGrowth">High Growth</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', entityRecommendationHTML);
    }
    
    // Function to add product
    window.addProduct = function(clientId, clientName) {
        const container = document.getElementById(`${clientId}_products`);
        const productCount = container.querySelectorAll('.product-item').length;
        
        const newProductHTML = createProductRecommendation(clientId, clientName, productCount);
        container.insertAdjacentHTML('beforeend', newProductHTML);
        
        // Initialize features for the new product
        setTimeout(() => {
            initializeProductFeatures();
            setupAutoSaveForNewElements();
            triggerAutoSave();
        }, 100);
    };
    
    // Function to initialize product features
    function initializeProductFeatures() {
        // Initialize all product dropdowns
        document.querySelectorAll('[id$="_name"]').forEach(input => {
            if (!input.parentElement.classList.contains('searchable-select')) {
                createSearchableDropdown(input.id, productOptions, function(selectedProduct) {
                    const productId = input.id.replace('_name', '');
                    const customGroup = document.getElementById(`${productId}_custom_group`);
                    const mdaSection = document.getElementById(`${productId}_mda_section`);
                    const mdaCheckbox = document.getElementById(`${productId}_mda`);
                    
                    if (selectedProduct === 'Custom') {
                        customGroup.style.display = 'block';
                        mdaSection.style.display = 'none';
                        // Clear MDA-related fields for custom products
                        if (mdaCheckbox) {
                            mdaCheckbox.checked = false;
                            const status = document.getElementById(`${productId}_mda_status`);
                            if (status) status.textContent = 'No';
                            const investmentOptions = document.getElementById(`${productId}_investment_options`);
                            if (investmentOptions) investmentOptions.style.display = 'none';
                            const investmentField = document.getElementById(`${productId}_investment`);
                            if (investmentField && investmentField.value === 'Refer to Investment option below') {
                                investmentField.value = '';
                            }
                        }
                    } else {
                        customGroup.style.display = 'none';
                        
                        // Show MDA section for applicable products
                        if (selectedProduct.includes('BT Panorama') || 
                            selectedProduct.includes('Centric Super Choice') || 
                            selectedProduct === 'Centric IDPS') {
                            mdaSection.style.display = 'block';
                            // Disable MDA for Centric Super One products
                            if (mdaCheckbox) {
                                mdaCheckbox.disabled = false;
                            }
                        } else if (selectedProduct.includes('Centric Super One')) {
                            mdaSection.style.display = 'none';
                            // Hide MDA for Centric Super One
                            if (mdaCheckbox) {
                                mdaCheckbox.checked = false;
                                mdaCheckbox.disabled = true;
                                const status = document.getElementById(`${productId}_mda_status`);
                                if (status) status.textContent = 'No';
                                const investmentOptions = document.getElementById(`${productId}_investment_options`);
                                if (investmentOptions) investmentOptions.style.display = 'none';
                            }
                        } else {
                            mdaSection.style.display = 'none';
                        }
                    }
                });
            }
        });
        
        // Initialize tranching toggles
        document.querySelectorAll('[id$="_tranching"]').forEach(toggle => {
            if (!toggle.hasAttribute('data-initialized')) {
                toggle.setAttribute('data-initialized', 'true');
                toggle.addEventListener('change', function() {
                    const productId = this.id.replace('_tranching', '');
                    const status = document.getElementById(`${productId}_tranching_status`);
                    const details = document.getElementById(`${productId}_tranching_details`);
                    
                    status.textContent = this.checked ? 'Yes' : 'No';
                    details.style.display = this.checked ? 'block' : 'none';
                    triggerAutoSave();
                });
            }
        });
        
        // Initialize MDA toggles
        document.querySelectorAll('[id$="_mda"]').forEach(toggle => {
            if (!toggle.hasAttribute('data-initialized')) {
                toggle.setAttribute('data-initialized', 'true');
                toggle.addEventListener('change', function() {
                    const productId = this.id.replace('_mda', '');
                    const status = document.getElementById(`${productId}_mda_status`);
                    const investmentOptions = document.getElementById(`${productId}_investment_options`);
                    const investmentField = document.getElementById(`${productId}_investment`);
                    
                    status.textContent = this.checked ? 'Yes' : 'No';
                    investmentOptions.style.display = this.checked ? 'block' : 'none';
                    
                    if (this.checked) {
                        updateInvestmentOptions(productId);
                        
                        // Update investment field to refer to investment option below
                        if (investmentField) {
                            investmentField.value = 'Refer to Investment option below';
                        }
                    } else {
                        // Clear the investment field if MDA is unchecked
                        if (investmentField && investmentField.value === 'Refer to Investment option below') {
                            investmentField.value = '';
                        }
                    }
                    triggerAutoSave();
                });
            }
        });
    }
    
    // Function to update investment options based on product selection
    function updateInvestmentOptions(productId) {
        const productNameInput = document.getElementById(`${productId}_name`);
        const investmentSelect = document.getElementById(`${productId}_investment_option`);
        
        if (!productNameInput || !investmentSelect) return;
        
        const productName = productNameInput.value;
        investmentSelect.innerHTML = '<option value="">Select investment option</option>';
        
        // Add options based on product
        if (productName.includes('BT Panorama')) {
            // BT Panorama - only Active Unlisted options
            const btRiskProfiles = ['Defensive', 'Moderate', 'Balanced', 'Growth', 'High Growth', 'Growth Plus', 'Custom'];
            btRiskProfiles.forEach(profile => {
                investmentSelect.innerHTML += `<option value="Active Unlisted ${profile}">Active Unlisted - ${profile}</option>`;
            });
        } else if (productName.includes('Centric Super Choice') || productName === 'Centric IDPS') {
            // Centric Choice and IDPS options
            const types = ['Passive', 'Active Unlisted', 'Active DNR HC', 'Active DNR SRI', 'Semi Active DNR HC', 'Semi Active DNR SRI'];
            const centricRiskProfiles = ['Defensive', 'Moderate', 'Balanced', 'Growth', 'High Growth', 'Growth Plus'];
            
            types.forEach(type => {
                centricRiskProfiles.forEach(profile => {
                    investmentSelect.innerHTML += `<option value="${type} ${profile}">${type} - ${profile}</option>`;
                });
            });
        }
        
        // Add event listener to update investment field when option is selected
        investmentSelect.addEventListener('change', function() {
            const investmentField = document.getElementById(`${productId}_investment`);
            const mdaCheckbox = document.getElementById(`${productId}_mda`);
            if (investmentField && mdaCheckbox && mdaCheckbox.checked) {
                investmentField.value = 'Refer to Investment option below';
            }
            triggerAutoSave();
        });
    }
    
    // Update fees based on entity selections
    function updateDynamicFees() {
        const container = document.getElementById('dynamicFeesContainer');
        container.innerHTML = '';
        
        let feesHTML = '<div class="grid-2">';
        
        if (entitySMSFCheckbox.checked) {
            feesHTML += `
                <div class="form-group">
                    <label for="smsfFees">SMSF fees:</label>
                    <input type="text" id="smsfFees" name="smsfFees" placeholder="Enter SMSF fees">
                </div>
            `;
        }
        
        if (entityTrustCheckbox.checked) {
            feesHTML += `
                <div class="form-group">
                    <label for="trustFees">Trust fees:</label>
                    <input type="text" id="trustFees" name="trustFees" placeholder="Enter Trust fees">
                </div>
            `;
        }
        
        if (entityCompanyCheckbox.checked) {
            feesHTML += `
                <div class="form-group">
                    <label for="companyFees">Company fees:</label>
                    <input type="text" id="companyFees" name="companyFees" placeholder="Enter Company fees">
                </div>
            `;
        }
        
        feesHTML += '</div>';
        
        if (entitySMSFCheckbox.checked || entityTrustCheckbox.checked || entityCompanyCheckbox.checked) {
            container.innerHTML = feesHTML;
            setupAutoSaveForNewElements();
        }
    }
    
    // Update compliance requirements based on client status
    function updateComplianceRequirements() {
        const container = document.getElementById('complianceRequirements');
        container.innerHTML = '';
        
        if (newClientRadio.checked) {
            // New client requirements - REMOVED FFQ
            const newClientHTML = `
                <div class="form-group">
                    <div class="checklist-item">
                        <input type="checkbox" id="clientIdUploaded" name="compliance" value="ClientID">
                        <label for="clientIdUploaded">Upload copy of ID to XPLAN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="amlCompletion" name="compliance" value="AML">
                        <label for="amlCompletion">AML to be completed per entity/individual save to XPLAN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="taskXGreenID" name="compliance" value="GreenID">
                        <label for="taskXGreenID">TaskX - Green ID to be completed</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="initialFN" name="compliance" value="InitialFN">
                        <label for="initialFN">Initial FN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="riskProfilingEvidence" name="riskProfiling" value="Evidence">
                        <label for="riskProfilingEvidence">Evidence of Risk profiling outcome in filenote</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="scopeOfAdvice" name="compliance" value="ScopeOfAdvice">
                        <label for="scopeOfAdvice">Scope of Advice to XPLAN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="finametricaSigned" name="compliance" value="FinametricaDoc">
                        <label for="finametricaSigned">Signed Questionnaire to be uploaded to XPLAN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="finametricaReport" name="compliance" value="FinametricaReport">
                        <label for="finametricaReport">Finametrica Report to be uploaded to XPLAN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="superResearch" name="compliance" value="SuperResearch">
                        <label for="superResearch">Super research confirmation</label>
                    </div>
                    
                    <div class="checklist-item" id="contributionHistoryItem" style="display: none; margin-left: 30px;">
                        <input type="checkbox" id="contributionHistory" name="compliance" value="ContributionHistory">
                        <label for="contributionHistory">Contribution history obtained</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="taskXNewAdvice" name="compliance" value="TaskXNewAdvice">
                        <label for="taskXNewAdvice">TaskX - New Advice Request</label>
                    </div>
                </div>
            `;
            container.innerHTML = newClientHTML;
        } else if (existingClientRadio.checked) {
            // Existing client requirements
            const existingClientHTML = `
                <div class="form-group">
                    <div class="checklist-item">
                        <input type="checkbox" id="strategicFN" name="compliance" value="StrategicFN">
                        <label for="strategicFN">Strategic FN / Other relevant FN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="riskProfilingEvidence" name="riskProfiling" value="Evidence">
                        <label for="riskProfilingEvidence">Evidence of Risk profiling outcome in filenote</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="uploadPricingCalc" name="compliance" value="UploadPricing">
                        <label for="uploadPricingCalc">Upload Pricing Calculator</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="workingsResearch" name="compliance" value="WorkingsResearch">
                        <label for="workingsResearch">Workings / Research etc to be uploaded</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="submitJira" name="compliance" value="SubmitJira">
                        <label for="submitJira">Submit JIRA for pricing/or PCR (if applicable)</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="superResearch" name="compliance" value="SuperResearch">
                        <label for="superResearch">Super research confirmation</label>
                    </div>
                    
                    <div class="checklist-item" id="contributionHistoryItem" style="display: none; margin-left: 30px;">
                        <input type="checkbox" id="contributionHistory" name="compliance" value="ContributionHistory">
                        <label for="contributionHistory">Contribution history obtained</label>
                    </div>
                </div>
            `;
            container.innerHTML = existingClientHTML;
        }
        
        // Add SMSF specific items if SMSF is selected
        if (entitySMSFCheckbox.checked) {
            const smsfHTML = `
                <div class="form-group">
                    <div class="checklist-item">
                        <input type="checkbox" id="smsfDocs" name="compliance" value="SMSFDocs">
                        <label for="smsfDocs">SMSF trust deed, financials, investment strategy, costs</label>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', smsfHTML);
        }
        
        // Add event listener for super research checkbox
        setTimeout(() => {
            const superResearchCheckbox = document.getElementById('superResearch');
            const contributionHistoryItem = document.getElementById('contributionHistoryItem');
            
            if (superResearchCheckbox && contributionHistoryItem) {
                superResearchCheckbox.addEventListener('change', function() {
                    contributionHistoryItem.style.display = this.checked ? 'block' : 'none';
                    if (!this.checked) {
                        document.getElementById('contributionHistory').checked = false;
                    }
                    triggerAutoSave();
                });
            }
            setupAutoSaveForNewElements();
        }, 100);
    }
    
    // Add this function to check for missing critical items
    function checkCriticalCompliance() {
        const criticalItems = [];
        
        // Check TMD
        const tmdDetails = document.getElementById('tmdDetails');
        const tmdInFilenote = document.getElementById('tmdInFilenote');
        if ((!tmdDetails || !tmdDetails.value.trim()) && (!tmdInFilenote || !tmdInFilenote.checked)) {
            criticalItems.push('TMD');
        }
        
        // Check Best Interests (You can add more checks here)
        // Add any other critical compliance checks
        
        return criticalItems;
    }

    // Add visual warnings for missing items
    function displayComplianceWarnings() {
        const missingItems = checkCriticalCompliance();
        
        if (missingItems.length > 0) {
            // Create or update warning display
            let warningDiv = document.getElementById('complianceWarning');
            if (!warningDiv) {
                warningDiv = document.createElement('div');
                warningDiv.id = 'complianceWarning';
                warningDiv.style.cssText = 'background-color: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; margin: 20px 0; border-radius: 8px;';
                const checklistSection = document.getElementById('checklistSection');
                if (checklistSection) {
                    checklistSection.insertBefore(warningDiv, checklistSection.firstChild);
                }
            }
            
            warningDiv.innerHTML = `
                <h4><i class="fas fa-exclamation-triangle"></i> Missing Critical Items:</h4>
                <ul>
                    ${missingItems.map(item => `<li><strong>${item}</strong> - Please complete before submission</li>`).join('')}
                </ul>
            `;
        } else {
            // Remove warning if all items are complete
            const warningDiv = document.getElementById('complianceWarning');
            if (warningDiv) {
                warningDiv.remove();
            }
        }
    }
    
    // Function to update form based on selected client types
    function updateFormBasedOnSelections() {
        // Update partner-related fields based on couple selection
        partnerNameGroup.style.display = coupleClientCheckbox.checked ? 'block' : 'none';
        
        // Update entity name field
        entityNameGroup.style.display = entityClientCheckbox.checked ? 'block' : 'none';
        
        // Update recommendation sections
        updateRecommendationSections();
        
        // Update dynamic fees
        updateDynamicFees();
        
        // Update compliance requirements
        updateComplianceRequirements();
        
        // Check compliance warnings
        displayComplianceWarnings();
    }
    
    // Add event listeners for client name changes
    document.getElementById('clientName').addEventListener('input', function() {
        updateRecommendationSections();
        triggerAutoSave();
    });
    document.getElementById('partnerName').addEventListener('input', function() {
        updateRecommendationSections();
        triggerAutoSave();
    });
    document.getElementById('entityName').addEventListener('input', function() {
        updateRecommendationSections();
        triggerAutoSave();
    });
    
    // Add event listeners for entity type checkboxes
    entitySMSFCheckbox.addEventListener('change', function() {
        updateFormBasedOnSelections();
    });
    entityTrustCheckbox.addEventListener('change', function() {
        updateFormBasedOnSelections();
    });
    entityCompanyCheckbox.addEventListener('change', function() {
        updateFormBasedOnSelections();
    });
    
    // Add event listeners for client status radio buttons
    newClientRadio.addEventListener('change', function() {
        updateComplianceRequirements();
        triggerAutoSave();
    });
    existingClientRadio.addEventListener('change', function() {
        updateComplianceRequirements();
        triggerAutoSave();
    });
    
    // Handle Flowchart Toggle
    flowchartRequiredToggle.addEventListener('change', function() {
        flowchartStatus.textContent = this.checked ? 'Yes' : 'No';
        triggerAutoSave();
    });
    
    // Handle Projection Length Dropdown
    projectionDateLength.addEventListener('change', function() {
        otherProjectionLength.style.display = this.value === 'other' ? 'block' : 'none';
        triggerAutoSave();
    });
    
    // Handle paraplanner compare checkbox
    paraplannerCompareCheckbox.addEventListener('change', function() {
        if (this.checked) {
            alternativePlatformsTextarea.value = 'Paraplanner to complete compare\n' + alternativePlatformsTextarea.value;
        } else {
            alternativePlatformsTextarea.value = alternativePlatformsTextarea.value.replace('Paraplanner to complete compare\n', '');
        }
        triggerAutoSave();
    });
    
    // Add event listeners for compliance monitoring
    document.addEventListener('input', displayComplianceWarnings);
    document.addEventListener('change', displayComplianceWarnings);
    
    // Draft Functionality
    function initializeDraftFunctionality() {
        loadDraftList();
        
        // Save draft modal functionality
        saveBtn.addEventListener('click', function() {
            const clientName = document.getElementById('clientName').value || 'Unnamed Client';
            draftNameInput.value = `${clientName} ARF`;
            saveDraftModal.style.display = 'block';
        });
        
        confirmSaveDraftBtn.addEventListener('click', function() {
            const draftName = draftNameInput.value.trim();
            if (draftName) {
                saveDraft(draftName);
                saveDraftModal.style.display = 'none';
                showAutoSaveIndicator('Draft saved successfully!');
            } else {
                alert('Please enter a draft name.');
            }
        });
        
        cancelSaveDraftBtn.addEventListener('click', function() {
            saveDraftModal.style.display = 'none';
        });
        
        closeModal.addEventListener('click', function() {
            saveDraftModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === saveDraftModal) {
                saveDraftModal.style.display = 'none';
            }
        });
        
        // Load draft functionality
        loadDraftBtn.addEventListener('click', function() {
            const selectedDraft = draftSelector.value;
            if (selectedDraft) {
                loadDraft(selectedDraft);
            } else {
                alert('Please select a draft to load.');
            }
        });
        
        // Delete draft functionality
        deleteDraftBtn.addEventListener('click', function() {
            const selectedDraft = draftSelector.value;
            if (selectedDraft) {
                if (confirm(`Are you sure you want to delete the draft "${selectedDraft}"?`)) {
                    deleteDraft(selectedDraft);
                }
            } else {
                alert('Please select a draft to delete.');
            }
        });
    }
    
    function loadDraftList() {
        const drafts = JSON.parse(localStorage.getItem('financialAdviceFormDrafts') || '{}');
        draftSelector.innerHTML = '<option value="">Select a saved draft...</option>';
        
        Object.keys(drafts).forEach(draftName => {
            const option = document.createElement('option');
            option.value = draftName;
            option.textContent = draftName;
            draftSelector.appendChild(option);
        });
    }
    
    function saveDraft(draftName) {
        const formData = collectFormData();
        const drafts = JSON.parse(localStorage.getItem('financialAdviceFormDrafts') || '{}');
        drafts[draftName] = {
            data: formData,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('financialAdviceFormDrafts', JSON.stringify(drafts));
        loadDraftList();
    }
    
    function loadDraft(draftName) {
        const drafts = JSON.parse(localStorage.getItem('financialAdviceFormDrafts') || '{}');
        if (drafts[draftName]) {
            populateFormData(drafts[draftName].data);
            showAutoSaveIndicator('Draft loaded successfully!');
        }
    }
    
    function deleteDraft(draftName) {
        const drafts = JSON.parse(localStorage.getItem('financialAdviceFormDrafts') || '{}');
        delete drafts[draftName];
        localStorage.setItem('financialAdviceFormDrafts', JSON.stringify(drafts));
        loadDraftList();
        draftSelector.value = '';
        showAutoSaveIndicator('Draft deleted successfully!');
    }
    
    // Auto-save functionality
    function setupAutoSave() {
        // Add auto-save to all form elements
        document.querySelectorAll('input, textarea, select').forEach(element => {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.addEventListener('change', triggerAutoSave);
            } else {
                element.addEventListener('input', triggerAutoSave);
                element.addEventListener('change', triggerAutoSave);
            }
        });
    }
    
    function setupAutoSaveForNewElements() {
        // Setup auto-save for dynamically added elements
        setTimeout(() => {
            document.querySelectorAll('input:not([data-autosave]), textarea:not([data-autosave]), select:not([data-autosave])').forEach(element => {
                element.setAttribute('data-autosave', 'true');
                if (element.type === 'checkbox' || element.type === 'radio') {
                    element.addEventListener('change', triggerAutoSave);
                } else {
                    element.addEventListener('input', triggerAutoSave);
                    element.addEventListener('change', triggerAutoSave);
                }
            });
        }, 100);
    }
    
    function triggerAutoSave() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const clientName = document.getElementById('clientName').value || 'Auto-Save';
            saveDraft(`${clientName} - Auto Save`);
            showAutoSaveIndicator();
        }, 2000); // Auto-save after 2 seconds of inactivity
    }
    
    function showAutoSaveIndicator(message = 'Auto-saved') {
        autoSaveIndicator.textContent = message;
        autoSaveIndicator.classList.add('show');
        setTimeout(() => {
            autoSaveIndicator.classList.remove('show');
        }, 2000);
    }
    
    function collectFormData() {
        const formData = {};
        document.querySelectorAll('input, textarea, select').forEach(element => {
            if (element.type === 'checkbox' || element.type === 'radio') {
                formData[element.id] = element.checked;
            } else {
                formData[element.id] = element.value;
            }
        });
        return formData;
    }
    
    function populateFormData(formData) {
        Object.keys(formData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    element.checked = formData[key];
                    if (element.type === 'checkbox') {
                        const item = element.closest('.checkbox-item');
                        if (item) {
                            item.classList.toggle('selected', element.checked);
                        }
                    }
                } else {
                    element.value = formData[key];
                }
            }
        });
        updateFormBasedOnSelections();
    }
    
    // Save to Xplan functionality
    saveToXplanBtnBottom.addEventListener('click', function() {
        // Show coming soon modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3><i class="fas fa-info-circle"></i> Feature Coming Soon</h3>
                <p>The "Save to Xplan" functionality is currently under development and will be available in a future update.</p>
                <p>In the meantime, you can:</p>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li>Save your work as a draft</li>
                    <li>Export to Word or PDF</li>
                    <li>Email the document to relevant parties</li>
                </ul>
                <div class="modal-buttons">
                    <button type="button" class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <i class="fas fa-check"></i> Got it
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    });
    
    // Email Document functionality
    emailDocumentBtnBottom.addEventListener('click', function() {
        const clientName = document.getElementById('clientName').value || 'Client';
        const subject = `Findex ARF for ${clientName}`;
        const body = `Dear Team,

Please find attached the Financial Advice Request Form (ARF) for ${clientName}.

This ARF contains:
- Client details and strategy recommendations
- Product recommendations and risk profiling
- Fee structure and compliance requirements
- All necessary documentation requirements

This document has been prepared for your acknowledgment and further processing.

If you have any questions or require additional information, please don't hesitate to contact me.

Best regards,
${document.getElementById('formCompletedBy').value || '[Your Name]'}`;
        
        // Create mailto link with Outlook-specific parameters
        const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Try to open Outlook web app first, fall back to mailto
        try {
            window.open(outlookUrl, '_blank');
        } catch (error) {
            // Fallback to regular mailto
            const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }
        
        // Show success message
        showAutoSaveIndicator('Email client opened. Note: Attachment requires manual addition.');
    });
    
    // Export to Word functionality - ENHANCED
    exportWordBtn.addEventListener('click', function() {
        const clientName = document.getElementById('clientName').value || 'Client';
        
        // Check for missing critical items
        const missingItems = checkCriticalCompliance();
        let complianceWarningHTML = '';
        
        if (missingItems.length > 0) {
            complianceWarningHTML = `
                <div style="background-color: #fff3cd; border: 2px solid #ffeaa7; color: #856404; padding: 15pt; margin: 20pt 0; border-radius: 5pt;">
                    <h3 style="color: #856404; margin-bottom: 10pt;">⚠️ Missing Critical Items:</h3>
                    <ul style="margin: 0; padding-left: 20pt;">
                        ${missingItems.map(item => `<li><strong>${item}</strong> - Please complete before submission</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Get clean HTML content
        const container = document.querySelector('.container').cloneNode(true);
        
        // Remove buttons and draft selector
        const buttons = container.querySelector('.btn-group');
        if (buttons) buttons.remove();
        
        // Remove hidden elements
        container.querySelectorAll('.draft-selector, .auto-save-indicator, .modal').forEach(el => el.remove());
        
        // Clean up styling for Word with better text separation
        const html = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset="utf-8">
                <title>Financial Advice Request Form - ${clientName}</title>
                <style>
                    @page WordSection1 {
                        margin: 1in;
                    }
                    body { 
                        font-family: 'Segoe UI', Calibri, Arial, sans-serif; 
                        line-height: 1.6; 
                        color: #2c3e50; 
                        margin: 30px; 
                        background: white;
                        font-size: 11pt;
                    }
                    h1 { 
                        font-size: 28pt; 
                        margin-bottom: 30pt; 
                        text-align: center;
                        color: #2c3e50;
                        font-weight: bold;
                        page-break-after: avoid;
                    }
                    h2 { 
                        font-size: 20pt; 
                        margin-top: 30pt; 
                        margin-bottom: 20pt; 
                        color: #2c3e50;
                        border-bottom: 3px solid #3498db;
                        padding-bottom: 8pt;
                        font-weight: bold;
                        page-break-after: avoid;
                    }
                    h3 { 
                        font-size: 16pt; 
                        margin-top: 25pt; 
                        margin-bottom: 15pt; 
                        color: #34495e;
                        font-weight: bold;
                        page-break-after: avoid;
                    }
                    h4 { 
                        font-size: 14pt; 
                        margin-top: 20pt; 
                        margin-bottom: 15pt; 
                        color: #34495e;
                        font-weight: bold;
                        page-break-after: avoid;
                    }
                    p { margin-bottom: 12pt; }
                    div { 
                        margin-bottom: 12pt !important; 
                        page-break-inside: avoid;
                    }
                    .section { 
                        margin-bottom: 30pt !important; 
                        padding: 20pt !important; 
                        border-left: 4px solid #1abc9c; 
                        background-color: #f9f9f9; 
                        page-break-inside: avoid !important;
                    }
                    .form-group { 
                        margin-bottom: 20pt !important;
                        page-break-inside: avoid !important;
                    }
                    label { 
                        font-weight: bold; 
                        display: block !important; 
                        margin-bottom: 8pt !important;
                        margin-top: 15pt !important;
                        color: #2c3e50;
                    }
                    input, textarea, select { 
                        display: block !important;
                        width: 100% !important;
                        margin-bottom: 15pt !important;
                        padding: 10pt !important;
                        border: 1px solid #ddd; 
                        font-family: Calibri, Arial, sans-serif; 
                        background-color: white;
                        white-space: pre-wrap !important;
                        word-wrap: break-word !important;
                        overflow-wrap: break-word !important;
                    }
                    textarea { 
                        min-height: 60pt;
                        white-space: pre-wrap !important;
                        word-wrap: break-word !important;
                        overflow-wrap: break-word !important;
                    }
                    .checklist-item { 
                        margin-bottom: 10pt; 
                        padding: 8pt; 
                        background-color: #ecf0f1; 
                        page-break-inside: avoid;
                        border-radius: 3pt;
                    }
                    .note { 
                        background-color: #e3f2fd; 
                        padding: 15pt; 
                        margin: 20pt 0; 
                        border-left: 4px solid #3498db;
                        border-radius: 3pt;
                    }
                    .product-item { 
                        border: 1px solid #ddd; 
                        padding: 15pt; 
                        margin-bottom: 15pt; 
                        background-color: #fff; 
                        page-break-inside: avoid;
                        border-radius: 3pt;
                    }
                    .grid-2 { display: block; }
                    .grid-2 > div { margin-bottom: 15pt; }
                    .product-recommendations, .risk-profile-section { 
                        margin: 20pt 0; 
                        padding: 15pt; 
                        background-color: #f0f8ff; 
                        border: 1px solid #ddd;
                        border-radius: 3pt;
                        page-break-inside: avoid;
                    }
                    .status-complete { background-color: #d5f4e6; color: #27ae60; }
                    .status-pending { background-color: #fadbd8; color: #e74c3c; }
                    .status-na { background-color: #ecf0f1; color: #95a5a6; }
                </style>
            </head>
            <body>
                ${complianceWarningHTML}
                ${container.innerHTML}
                <div style="margin-top: 40px; text-align: center; border-top: 2px solid #bdc3c7; padding-top: 20px;">
                    <p style="color: #7f8c8d; font-size: 10pt; margin: 0;">
                        Document generated on ${new Date().toLocaleString()} | Financial Advice Request Form
                    </p>
                </div>
            </body>
            </html>
        `;
        
        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Financial_Advice_Request_Form_${clientName.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
        a.click();
        URL.revokeObjectURL(url);
        
        showAutoSaveIndicator('Word document exported successfully!');
    });
    
    // Export to PDF functionality
    exportPdfBtn.addEventListener('click', function() {
        const clientName = document.getElementById('clientName').value || 'Client';
        const element = document.querySelector('.container');
        
        // Check for missing critical items
        const missingItems = checkCriticalCompliance();
        
        // Hide elements that shouldn't be in PDF
        const elementsToHide = document.querySelectorAll('.btn-group, .draft-selector, .auto-save-indicator, .modal, #complianceWarning');
        elementsToHide.forEach(el => el.style.display = 'none');
        
        // Add temporary warning if items are missing
        let tempWarning = null;
        if (missingItems.length > 0) {
            tempWarning = document.createElement('div');
            tempWarning.style.cssText = 'background-color: #fff3cd; border: 2px solid #ffeaa7; color: #856404; padding: 15px; margin: 20px 0; border-radius: 8px; page-break-after: always;';
            tempWarning.innerHTML = `
                <h3>⚠️ Missing Critical Items:</h3>
                <ul>
                    ${missingItems.map(item => `<li><strong>${item}</strong> - Please complete before submission</li>`).join('')}
                </ul>
            `;
            element.insertBefore(tempWarning, element.firstChild);
        }
        
        // Configure html2pdf options
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `Financial_Advice_Request_Form_${clientName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                logging: false,
                useCORS: true,
                letterRendering: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.section',
                avoid: ['.product-item', '.checklist-item', '.form-group']
            }
        };
        
        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Restore hidden elements
            elementsToHide.forEach(el => el.style.display = '');
            
            // Remove temporary warning if added
            if (tempWarning) {
                tempWarning.remove();
            }
            
            // Restore compliance warning if it existed
            displayComplianceWarnings();
            
            showAutoSaveIndicator('PDF exported successfully!');
        });
    });
    
    // Reset Form functionality
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            // Reset form fields
            document.querySelectorAll('input[type="text"], input[type="date"], input[type="number"], textarea').forEach(field => {
                field.value = '';
                // Reset textarea size
                if (field.tagName === 'TEXTAREA') {
                    field.style.height = 'auto';
                }
            });
            
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            
            document.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });
            
            // Reset client type selection
            document.querySelectorAll('.checkbox-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Hide conditional sections
            partnerNameGroup.style.display = 'none';
            entityNameGroup.style.display = 'none';
            entitySelector.style.display = 'none';
            
            // Clear dynamic content
            document.getElementById('recommendationsSectionsContainer').innerHTML = '';
            document.getElementById('dynamicFeesContainer').innerHTML = '';
            document.getElementById('complianceRequirements').innerHTML = '';
            
            // Reset other UI elements
            flowchartRequiredToggle.checked = false;
            flowchartStatus.textContent = 'No';
            projectionDateLength.value = 'lifeExpectancy';
            otherProjectionLength.style.display = 'none';
            
            // Reset paraplanner compare checkbox
            paraplannerCompareCheckbox.checked = false;
            alternativePlatformsTextarea.value = '';
            
            // Hide alternative strategies dropdown if visible
            if (altStrategiesDropdown) {
                altStrategiesDropdown.style.display = 'none';
            }
            
            // Remove compliance warning
            const warningDiv = document.getElementById('complianceWarning');
            if (warningDiv) {
                warningDiv.remove();
            }
            
            showAutoSaveIndicator('Form has been reset!');
        }
    });
    
    // Initial form update
    updateFormBasedOnSelections();
    
    // Setup auto-save for existing elements
    setupAutoSave();
});
