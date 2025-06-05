document.addEventListener('DOMContentLoaded', function() {
    // Client Status Radio Buttons
    const newClientRadio = document.getElementById('newClient');
    const existingClientRadio = document.getElementById('existingClient');document.addEventListener('DOMContentLoaded', function() {
    console.log('ARF Form initializing...');
    
    // Global variables
    let hasUnsavedChanges = false;
    let autoSaveInterval;
    let currentSaveName = '';
    let productCounter = 0;
    
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
    
    // Save system elements
    const saveDialog = document.getElementById('saveDialog');
    const saveNameInput = document.getElementById('saveNameInput');
    const confirmSaveBtn = document.getElementById('confirmSaveBtn');
    const cancelSaveBtn = document.getElementById('cancelSaveBtn');
    const savedArfsSelect = document.getElementById('savedArfsSelect');
    const saveStatus = document.getElementById('saveStatus');
    
    // Alternative platforms checkbox
    const paraplannerCompareCheckbox = document.getElementById('paraplannerCompare');
    const alternativePlatformsTextarea = document.getElementById('alternativePlatforms');
    
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
    
    // Initialize auto-save and form
    startAutoSave();
    loadSavedArfsDropdown();
    
    // Warn before leaving if unsaved changes
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
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
                    <label for="clientRecommendations">${clientName} Recommendations:</label>
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
                    <label for="partnerRecommendations">${partnerName} Recommendations:</label>
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
                    <label for="jointRecommendations">Joint Recommendations:</label>
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
                    <label for="dependantsRecommendations">Dependants Recommendations:</label>
                    <textarea id="dependantsRecommendations" name="dependantsRecommendations" 
                        placeholder="Enter recommendations for dependants"></textarea>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', dependantsRecommendationHTML);
        }
        
        // Initialize all product dropdowns and event listeners
        setTimeout(() => {
            initializeProductFeatures();
        }, 100);
    }
    
    // Helper function to add entity recommendation sections
    function addEntityRecommendation(entityType, entityName) {
        const container = document.getElementById('recommendationsSectionsContainer');
        const entityId = entityType.toLowerCase();
        
        const entityRecommendationHTML = `
            <div class="form-group">
                <label for="${entityId}Recommendations">${entityType} - ${entityName} Recommendations:</label>
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
        }
    }
    
    // Update compliance requirements based on client status
    function updateComplianceRequirements() {
        const container = document.getElementById('complianceRequirements');
        container.innerHTML = '';
        
        if (newClientRadio.checked) {
            // New client requirements
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
                        <input type="checkbox" id="clientFFQ" name="compliance" value="ClientFFQ">
                        <label for="clientFFQ">Completed FFQ to XPLAN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="scopeOfAdvice" name="compliance" value="ScopeOfAdvice">
                        <label for="scopeOfAdvice">Scope of Advice to XPLAN</label>
                    </div>
                    
                    <div class="checklist-item">
                        <input type="checkbox" id="finametricaSigned" name="compliance" value="FinametricaDoc">
                        <label for="finametricaSigned">Signed Finametrica Document to be uploaded to XPLAN</label>
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
        const superResearchCheckbox = document.getElementById('superResearch');
        const contributionHistoryItem = document.getElementById('contributionHistoryItem');
        
        if (superResearchCheckbox && contributionHistoryItem) {
            superResearchCheckbox.addEventListener('change', function() {
                contributionHistoryItem.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) {
                    document.getElementById('contributionHistory').checked = false;
                }
            });
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
    }
    
    // Add event listeners for client name changes
    document.getElementById('clientName').addEventListener('input', updateRecommendationSections);
    document.getElementById('partnerName').addEventListener('input', updateRecommendationSections);
    document.getElementById('entityName').addEventListener('input', updateRecommendationSections);
    
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
    newClientRadio.addEventListener('change', updateComplianceRequirements);
    existingClientRadio.addEventListener('change', updateComplianceRequirements);
    
    // Handle Flowchart Toggle
    flowchartRequiredToggle.addEventListener('change', function() {
        flowchartStatus.textContent = this.checked ? 'Yes' : 'No';
    });
    
    // Handle Projection Length Dropdown
    projectionDateLength.addEventListener('change', function() {
        otherProjectionLength.style.display = this.value === 'other' ? 'block' : 'none';
    });
    
    // Handle paraplanner compare checkbox
    paraplannerCompareCheckbox.addEventListener('change', function() {
        if (this.checked) {
            alternativePlatformsTextarea.value = 'Paraplanner to complete compare\n' + alternativePlatformsTextarea.value;
        } else {
            alternativePlatformsTextarea.value = alternativePlatformsTextarea.value.replace('Paraplanner to complete compare\n', '');
        }
    });
    
    // AUTO-SAVE FUNCTIONALITY
    function startAutoSave() {
        // Save every 30 seconds
        autoSaveInterval = setInterval(() => {
            if (hasUnsavedChanges) {
                autoSave();
            }
        }, 30000);
        
        // Add change listeners to all form inputs
        document.addEventListener('change', markAsChanged);
        document.addEventListener('input', markAsChanged);
    }
    
    function markAsChanged() {
        hasUnsavedChanges = true;
        showSaveStatus('saving');
    }
    
    function autoSave() {
        if (currentSaveName) {
            saveFormData(currentSaveName, true);
        } else {
            saveFormData('Auto-save Draft', true);
        }
    }
    
    function showSaveStatus(status) {
        if (saveStatus) {
            saveStatus.className = `save-status ${status}`;
            if (status === 'saved') {
                setTimeout(() => {
                    saveStatus.className = 'save-status';
                }, 2000);
            }
        }
    }
    
    function saveFormData(name, isAutoSave = false) {
        try {
            const formData = {};
            document.querySelectorAll('input, textarea, select').forEach(element => {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    formData[element.id] = element.checked;
                } else {
                    formData[element.id] = element.value;
                }
            });
            
            const savedArfs = JSON.parse(localStorage.getItem('savedArfs') || '{}');
            savedArfs[name] = {
                data: formData,
                timestamp: new Date().toISOString(),
                isAutoSave: isAutoSave
            };
            
            localStorage.setItem('savedArfs', JSON.stringify(savedArfs));
            
            if (!isAutoSave) {
                currentSaveName = name;
                hasUnsavedChanges = false;
                loadSavedArfsDropdown();
                showSaveStatus('saved');
            } else {
                showSaveStatus('saved');
            }
        } catch (error) {
            console.error('Save error:', error);
        }
    }
    
    function loadSavedArfsDropdown() {
        if (!savedArfsSelect) return;
        
        try {
            const savedArfs = JSON.parse(localStorage.getItem('savedArfs') || '{}');
            savedArfsSelect.innerHTML = '<option value="">Load Saved ARF...</option>';
            
            Object.keys(savedArfs).forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = `${name} (${new Date(savedArfs[name].timestamp).toLocaleDateString()})`;
                savedArfsSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Load dropdown error:', error);
        }
    }
    
    function loadFormData(name) {
        try {
            const savedArfs = JSON.parse(localStorage.getItem('savedArfs') || '{}');
            if (savedArfs[name]) {
                const formData = savedArfs[name].data;
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
                currentSaveName = name;
                hasUnsavedChanges = false;
                updateFormBasedOnSelections();
                showSaveStatus('saved');
            }
        } catch (error) {
            console.error('Load form error:', error);
        }
    }
    
    // Get current form content for export
    function getCurrentFormContent() {
        const container = document.querySelector('.container').cloneNode(true);
        
        // Remove buttons and controls
        const btnGroup = container.querySelector('.btn-group');
        if (btnGroup) btnGroup.remove();
        
        // Remove hidden sections
        const hiddenSections = container.querySelectorAll('.section.hidden, [style*="display: none"]');
        hiddenSections.forEach(section => section.remove());
        
        // Remove empty sections that aren't relevant
        const sections = container.querySelectorAll('.section');
        sections.forEach(section => {
            const inputs = section.querySelectorAll('input, textarea, select');
            let hasContent = false;
            
            inputs.forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    if (input.checked) hasContent = true;
                } else if (input.value.trim()) {
                    hasContent = true;
                }
            });
            
            // Always keep certain essential sections
            const essentialSections = ['clientTypeSection', 'strategyDetailsSection'];
            const sectionId = section.id;
            
            if (!hasContent && !essentialSections.includes(sectionId)) {
                section.remove();
            }
        });
        
        return container;
    }
    
    // BUTTON EVENT LISTENERS
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            console.log('Save button clicked');
            saveDialog.style.display = 'flex';
            saveNameInput.value = currentSaveName || '';
            saveNameInput.focus();
        });
    }
    
    if (confirmSaveBtn) {
        confirmSaveBtn.addEventListener('click', function() {
            const name = saveNameInput.value.trim();
            if (name) {
                saveFormData(name);
                saveDialog.style.display = 'none';
            } else {
                alert('Please enter a name for the ARF');
            }
        });
    }
    
    if (cancelSaveBtn) {
        cancelSaveBtn.addEventListener('click', function() {
            saveDialog.style.display = 'none';
        });
    }
    
    if (savedArfsSelect) {
        savedArfsSelect.addEventListener('change', function() {
            if (this.value) {
                if (hasUnsavedChanges) {
                    if (confirm('You have unsaved changes. Do you want to continue loading the saved ARF?')) {
                        loadFormData(this.value);
                    } else {
                        this.value = '';
                    }
                } else {
                    loadFormData(this.value);
                }
            }
        });
    }
    
    // Export to Word functionality
    if (exportWordBtn) {
        exportWordBtn.addEventListener('click', function() {
            console.log('Export Word button clicked');
            try {
                const content = getCurrentFormContent();
                const clientName = document.getElementById('clientName').value || 'Client';
                
                const html = `
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head>
                        <meta charset="utf-8">
                        <title>Financial Advice Request Form - ${clientName}</title>
                        <style>
                            body { font-family: Calibri, Arial, sans-serif; line-height: 1.5; color: #000; margin: 20px; }
                            h1 { font-size: 24pt; text-align: center; color: #2c3e50; margin-bottom: 20pt; }
                            h2 { font-size: 18pt; color: #3498db; margin-top: 20pt; margin-bottom: 10pt; border-bottom: 2px solid #ecf0f1; padding-bottom: 5pt; }
                            h3 { font-size: 14pt; color: #34495e; margin-top: 15pt; margin-bottom: 10pt; }
                            h4 { font-size: 12pt; color: #34495e; margin-top: 10pt; margin-bottom: 8pt; }
                            .section { margin-bottom: 20pt; padding: 15pt; border-left: 4px solid #1abc9c; background-color: #f9f9f9; page-break-inside: avoid; }
                            .form-group { margin-bottom: 15pt; }
                            label { font-weight: bold; display: block; margin-bottom: 5pt; }
                            input, textarea, select { border: 1px solid #ddd; padding: 8pt; width: 100%; margin-bottom: 10pt; font-family: Calibri, Arial, sans-serif; background: white; }
                            textarea { min-height: 60px; vertical-align: top; }
                            .checklist-item { margin-bottom: 8pt; padding: 5pt; background-color: #ecf0f1; }
                            .note { background-color: #e3f2fd; padding: 10pt; margin: 15pt 0; border-left: 4px solid #3498db; }
                            .product-item { border: 1px solid #ddd; padding: 10pt; margin-bottom: 10pt; background-color: #fff; page-break-inside: avoid; }
                            .grid-2 { display: table; width: 100%; }
                            .grid-2 > div { display: table-cell; padding: 5pt; width: 50%; }
                            .checkbox-item { display: inline-block; margin: 5pt; padding: 5pt; background: #f0f0f0; }
                            .radio-item { display: inline-block; margin: 5pt; padding: 5pt; background: #f0f0f0; }
                            .hidden { display: none; }
                            i { display: none; }
                        </style>
                    </head>
                    <body>
                        ${content.innerHTML}
                    </body>
                    </html>
                `;
                
                const blob = new Blob([html], { type: 'application/msword' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Findex_ARF_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.doc`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                console.log('Word export completed');
            } catch (error) {
                console.error('Word export error:', error);
                alert('Error exporting to Word. Please try again.');
            }
        });
    }
    
    // Export to PDF functionality
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            console.log('Export PDF button clicked');
            
            if (typeof html2pdf === 'undefined') {
                console.error('html2pdf library not loaded');
                alert('PDF export library not loaded. Please refresh the page and try again.');
                return;
            }
            
            try {
                const content = getCurrentFormContent();
                const clientName = document.getElementById('clientName').value || 'Client';
                
                const opt = {
                    margin: [15, 15, 15, 15],
                    filename: `Findex_ARF_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
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
                
                html2pdf().set(opt).from(content).save().then(() => {
                    console.log('PDF export completed');
                }).catch(error => {
                    console.error('PDF export error:', error);
                    alert('Error generating PDF. Please try again.');
                });
                
            } catch (error) {
                console.error('PDF export error:', error);
                alert('Error exporting to PDF. Please try again.');
            }
        });
    }
    
    // Save to Xplan functionality
    if (saveToXplanBtnBottom) {
        saveToXplanBtnBottom.addEventListener('click', function() {
            console.log('Save to Xplan button clicked');
            alert('This functionality is coming soon.');
        });
    }
    
    // Email Document functionality
    if (emailDocumentBtnBottom) {
        emailDocumentBtnBottom.addEventListener('click', function() {
            console.log('Email document button clicked');
            try {
                const clientName = document.getElementById('clientName').value || 'Client';
                
                const subject = `Findex ARF for ${clientName}`;
                const body = `Hi,

Please find attached the draft Advice Request Form (ARF) for ${clientName} for your review and approval.

This document contains the strategy recommendations and compliance requirements for the client's financial advice needs. Please review the details and let me know if you have any questions or require any modifications.

Thank you for your attention to this matter.

Best regards`;
                
                const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Try to open email client
                window.location.href = mailtoLink;
                
                // Also generate PDF for attachment
                if (exportPdfBtn) {
                    setTimeout(() => {
                        exportPdfBtn.click();
                    }, 1000);
                }
                
                setTimeout(() => {
                    alert('Email client opened. A PDF has also been generated for you to attach manually.');
                }, 1500);
                
            } catch (error) {
                console.error('Email error:', error);
                alert('Error opening email client. Please try again.');
            }
        });
    }
    
    // Reset Form functionality
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            console.log('Reset button clicked');
            if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
                // Reset form fields
                document.querySelectorAll('input[type="text"], input[type="date"], input[type="number"], textarea').forEach(field => {
                    field.value = '';
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
                
                // Reset save state
                currentSaveName = '';
                hasUnsavedChanges = false;
                showSaveStatus('');
                
                alert('Form has been reset!');
            }
        });
    }
    
    // Initial form update
    updateFormBasedOnSelections();
    
    console.log('ARF Form initialized successfully!');
});
    
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
