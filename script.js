document.addEventListener('DOMContentLoaded', function() {
    // Client Status Radio Buttons
    const newClientRadio = document.getElementById('newClient');
    const existingClientRadio = document.getElementById('existingClient');

const alternativeStrategies = {
    super_contributions: [
        "Investing outside super – bond or wrap account",
        "Retaining funds in cash", 
        "Debt reduction",
        "Other contribution types"
    ],
    account_based_pensions: [
        "Withdraw from super and invest outside",
        "Withdraw and recontribute to spouse",
        "Retain in accumulation and take lump sums"
    ],
    maximising_centrelink: [
        "Use of annuities",
        "Funeral bonds",
        "Gifting",
        "Upsizing the home",
        "Investing super in younger spouse's name",
        "Debt reduction"
    ],
    insurance: [
        "Inside vs outside super ownership",
        "Stand-alone vs linked cover",
        "Stepped vs level premiums",
        "Policy features (e.g. wait period, benefit period, indexation)"
    ]
};

// Alternative Strategy Modal functionality
const alternativeStrategyModal = document.getElementById('alternativeStrategyModal');
const addAlternativeStrategyBtn = document.getElementById('addAlternativeStrategyBtn');
const closeAlternativeModal = document.getElementById('closeAlternativeModal');
const cancelAlternativeModal = document.getElementById('cancelAlternativeModal');
const addSelectedStrategies = document.getElementById('addSelectedStrategies');
const strategyDropdown = document.getElementById('strategyDropdown');
const strategyOptions = document.getElementById('strategyOptions');
const alternativeStrategiesTextarea = document.getElementById('alternativeStrategies');

// Open modal
addAlternativeStrategyBtn.addEventListener('click', function() {
    alternativeStrategyModal.style.display = 'block';
    populateStrategyOptions('');
});

// Close modal events
closeAlternativeModal.addEventListener('click', function() {
    alternativeStrategyModal.style.display = 'none';
});

cancelAlternativeModal.addEventListener('click', function() {
    alternativeStrategyModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === alternativeStrategyModal) {
        alternativeStrategyModal.style.display = 'none';
    }
});

// Populate strategy options based on dropdown selection
strategyDropdown.addEventListener('change', function() {
    populateStrategyOptions(this.value);
});

function populateStrategyOptions(category) {
    strategyOptions.innerHTML = '';
    
    if (!category) {
        strategyOptions.innerHTML = '<p style="color: #666; font-style: italic;">Please select a strategy category above to see available options.</p>';
        return;
    }
    
    const strategies = alternativeStrategies[category];
    if (!strategies) return;
    
    const categoryTitle = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    strategies.forEach((strategy, index) => {
        const strategyId = `strategy_${category}_${index}`;
        const strategyHtml = `
            <div class="checkbox-item" style="margin-bottom: 10px; display: block; width: 100%;">
                <input type="checkbox" id="${strategyId}" value="${strategy}" style="margin-right: 8px;">
                <label for="${strategyId}" style="margin-bottom: 0; cursor: pointer; flex: 1;">
                    <strong>Alternative strategy ${categoryTitle}:</strong> ${strategy}
                </label>
            </div>
        `;
        strategyOptions.insertAdjacentHTML('beforeend', strategyHtml);
    });
}

// Add selected strategies to textarea
addSelectedStrategies.addEventListener('click', function() {
    const selectedStrategies = [];
    const checkboxes = strategyOptions.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent.trim();
        selectedStrategies.push(label + '\nReason for discount: \n');
    });
    
    if (selectedStrategies.length > 0) {
        const currentText = alternativeStrategiesTextarea.value;
        const newText = currentText + (currentText ? '\n\n' : '') + selectedStrategies.join('\n');
        alternativeStrategiesTextarea.value = newText;
        
        // Trigger auto-save
        triggerAutoSave();
        
        // Show success message
        showAutoSaveIndicator(`Added ${selectedStrategies.length} alternative strategies`);
    }
    
    // Close modal
    alternativeStrategyModal.style.display = 'none';
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
    
    function updateRecommendationSections() {
    const container = document.getElementById('recommendationsSectionsContainer');
    container.innerHTML = '';
    
    // Get client names
    const clientName = document.getElementById('clientName').value || 'Client 1';
    const partnerName = document.getElementById('partnerName').value || 'Client 2';
    
    // Add client recommendations if single or couple is selected
    if (singleClientCheckbox.checked || coupleClientCheckbox.checked) {
        const clientRecommendationHTML = `
            <div class="recommendation-section">
                <div class="recommendation-textarea">
                    <div class="recommendation-header">
                        <label for="clientRecommendations">${clientName} Recommendations/Scope:</label>
                        <div class="recommendation-checkbox">
                            <input type="checkbox" id="client1ProductRecsCheckbox" name="client1ProductRecsCheckbox">
                            <label for="client1ProductRecsCheckbox">Product Recommendations?</label>
                        </div>
                    </div>
                    <textarea id="clientRecommendations" name="clientRecommendations" 
                        placeholder="Enter recommendations/scope for ${clientName}"></textarea>
                </div>
                <div class="risk-profile-inline">
                    <div class="form-group">
                        <label for="riskProfile1">Risk Profile - ${clientName}:</label>
                        <select id="riskProfile1" name="riskProfile1">
                            <option value="">Select Risk Profile</option>
                            <option value="conservative">Conservative</option>
                            <option value="defensive">Defensive</option>
                            <option value="moderate">Moderate</option>
                            <option value="balanced">Balanced</option>
                            <option value="growth">Growth</option>
                            <option value="highGrowth">High Growth</option>
                            <option value="growthPlus">Growth Plus</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="product-recommendations" id="client1ProductRecommendationsSection" style="display: none;">
                <h4>Product Recommendations - ${clientName}</h4>
                <div id="client1_products">
                    ${createProductRecommendation("client1", clientName, 0)}
                </div>
                <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('client1', '${clientName}')">
                    <i class="fas fa-plus"></i> Add Product
                </button>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', clientRecommendationHTML);
    }
    
    // Add partner recommendations if couple is selected
    if (coupleClientCheckbox.checked) {
        const partnerRecommendationHTML = `
            <div class="recommendation-section">
                <div class="recommendation-textarea">
                    <div class="recommendation-header">
                        <label for="partnerRecommendations">${partnerName} Recommendations/Scope:</label>
                        <div class="recommendation-checkbox">
                            <input type="checkbox" id="client2ProductRecsCheckbox" name="client2ProductRecsCheckbox">
                            <label for="client2ProductRecsCheckbox">Product Recommendations?</label>
                        </div>
                    </div>
                    <textarea id="partnerRecommendations" name="partnerRecommendations" 
                        placeholder="Enter recommendations/scope for ${partnerName}"></textarea>
                </div>
                <div class="risk-profile-inline">
                    <div class="form-group">
                        <label for="riskProfile2">Risk Profile - ${partnerName}:</label>
                        <select id="riskProfile2" name="riskProfile2">
                            <option value="">Select Risk Profile</option>
                            <option value="conservative">Conservative</option>
                            <option value="defensive">Defensive</option>
                            <option value="moderate">Moderate</option>
                            <option value="balanced">Balanced</option>
                            <option value="growth">Growth</option>
                            <option value="highGrowth">High Growth</option>
                            <option value="growthPlus">Growth Plus</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="product-recommendations" id="client2ProductRecommendationsSection" style="display: none;">
                <h4>Product Recommendations - ${partnerName}</h4>
                <div id="client2_products">
                    ${createProductRecommendation("client2", partnerName, 0)}
                </div>
                <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('client2', '${partnerName}')">
                    <i class="fas fa-plus"></i> Add Product
                </button>
            </div>
            
            <div class="recommendation-section">
                <div class="recommendation-textarea">
                    <div class="recommendation-header">
                        <label for="jointRecommendations">Joint Recommendations/Scope:</label>
                        <div class="recommendation-checkbox">
                            <input type="checkbox" id="jointProductRecsCheckbox" name="jointProductRecsCheckbox">
                            <label for="jointProductRecsCheckbox">Product Recommendations?</label>
                        </div>
                    </div>
                    <textarea id="jointRecommendations" name="jointRecommendations" 
                        placeholder="Enter joint recommendations/scope"></textarea>
                    <button type="button" class="btn btn-secondary btn-sm na-button" onclick="fillJointNA()">
                        N/A
                    </button>
                </div>
                <div class="risk-profile-inline">
                    <div class="form-group">
                        <label for="riskProfileJoint">Risk Profile - Joint:</label>
                        <select id="riskProfileJoint" name="riskProfileJoint">
                            <option value="">Select Risk Profile</option>
                            <option value="conservative">Conservative</option>
                            <option value="defensive">Defensive</option>
                            <option value="moderate">Moderate</option>
                            <option value="balanced">Balanced</option>
                            <option value="growth">Growth</option>
                            <option value="highGrowth">High Growth</option>
                            <option value="growthPlus">Growth Plus</option>
                            <option value="na">N/A</option>
                            <option value="custom">Custom</option>
                        </select>
                        <button type="button" class="btn btn-secondary btn-sm na-button" onclick="fillJointRiskNA()">
                            N/A
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="product-recommendations" id="jointProductRecommendationsSection" style="display: none;">
                <h4>Product Recommendations - Joint</h4>
                <div id="joint_products">
                    ${createProductRecommendation("joint", "Joint", 0)}
                </div>
                <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('joint', 'Joint')">
                    <i class="fas fa-plus"></i> Add Product
                </button>
                <button type="button" class="btn btn-secondary btn-sm na-button" onclick="fillJointProductNA()">
                    N/A
                </button>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', partnerRecommendationHTML);
    }
    
    // Add entity recommendations
    if (entityClientCheckbox.checked) {
        if (entitySMSFCheckbox.checked) {
            const smsfName = document.getElementById('smsfName').value || 'SMSF';
            addEntityRecommendation('SMSF', smsfName);
        }
        
        if (entityTrustCheckbox.checked) {
            const trustName = document.getElementById('trustName').value || 'Trust';
            addEntityRecommendation('Trust', trustName);
        }
        
        if (entityCompanyCheckbox.checked) {
            const companyName = document.getElementById('companyName').value || 'Company';
            addEntityRecommendation('Company', companyName);
        }
    }
    
    // Add dependants recommendations if selected
    if (dependantsClientCheckbox.checked) {
        const dependantsRecommendationHTML = `
            <div class="recommendation-section">
                <div class="recommendation-textarea">
                    <div class="recommendation-header">
                        <label for="dependantsRecommendations">Dependants Recommendations/Scope:</label>
                        <div class="recommendation-checkbox">
                            <input type="checkbox" id="dependantsProductRecsCheckbox" name="dependantsProductRecsCheckbox">
                            <label for="dependantsProductRecsCheckbox">Product Recommendations?</label>
                        </div>
                    </div>
                    <textarea id="dependantsRecommendations" name="dependantsRecommendations" 
                        placeholder="Enter recommendations/scope for dependants"></textarea>
                </div>
                <div class="risk-profile-inline">
                    <div class="form-group">
                        <label for="riskProfileDependants">Risk Profile - Dependants:</label>
                        <select id="riskProfileDependants" name="riskProfileDependants">
                            <option value="">Select Risk Profile</option>
                            <option value="conservative">Conservative</option>
                            <option value="defensive">Defensive</option>
                            <option value="moderate">Moderate</option>
                            <option value="balanced">Balanced</option>
                            <option value="growth">Growth</option>
                            <option value="highGrowth">High Growth</option>
                            <option value="growthPlus">Growth Plus</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="product-recommendations" id="dependantsProductRecommendationsSection" style="display: none;">
                <h4>Product Recommendations - Dependants</h4>
                <div id="dependants_products">
                    ${createProductRecommendation("dependants", "Dependants", 0)}
                </div>
                <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('dependants', 'Dependants')">
                    <i class="fas fa-plus"></i> Add Product
                </button>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', dependantsRecommendationHTML);
    }
    
    // Initialize all product dropdowns and event listeners
    setTimeout(() => {
        console.log("Starting product features initialization...");
        initializeProductFeatures();
        setupProductRecommendationToggles();
        setupAutoSaveForNewElements();
        
        // Ensure product recommendation sections are properly displayed based on saved state
        document.querySelectorAll('[id$="ProductRecsCheckbox"]').forEach(checkbox => {
            if (checkbox.checked) {
                // Trigger the change event to show the section
                const event = new Event('change');
                checkbox.dispatchEvent(event);
            }
        });
        
        console.log('Initialized recommendation sections with', 
                   document.querySelectorAll('[id$="ProductRecsCheckbox"]').length, 'product checkboxes');
    }, 200);
}

    
    // Helper function to add entity recommendation sections
    function addEntityRecommendation(entityType, entityName) {
    const container = document.getElementById('recommendationsSectionsContainer');
    const entityId = entityType.toLowerCase();
    
    const entityRecommendationHTML = `
        <div class="recommendation-section">
            <div class="recommendation-textarea">
                <div class="recommendation-header">
                    <label for="${entityId}Recommendations">${entityType} - ${entityName} Recommendations/Scope:</label>
                    <div class="recommendation-checkbox">
                        <input type="checkbox" id="${entityId}ProductRecsCheckbox" name="${entityId}ProductRecsCheckbox">
                        <label for="${entityId}ProductRecsCheckbox">Product Recommendations?</label>
                    </div>
                </div>
                <textarea id="${entityId}Recommendations" name="${entityId}Recommendations" 
                    placeholder="Enter recommendations/scope for ${entityType}"></textarea>
            </div>
            <div class="risk-profile-inline">
                <div class="form-group">
                    <label for="riskProfile${entityId}">Risk Profile - ${entityType}:</label>
                    <select id="riskProfile${entityId}" name="riskProfile${entityId}">
                        <option value="">Select Risk Profile</option>
                        <option value="conservative">Conservative</option>
                        <option value="defensive">Defensive</option>
                        <option value="moderate">Moderate</option>
                        <option value="balanced">Balanced</option>
                        <option value="growth">Growth</option>
                        <option value="highGrowth">High Growth</option>
                        <option value="growthPlus">Growth Plus</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="product-recommendations" id="${entityId}ProductRecommendationsSection" style="display: none;">
            <h4>Product Recommendations - ${entityType} - ${entityName}</h4>
            <div id="${entityId}_products">
                ${createProductRecommendation(entityId, entityName, 0)}
            </div>
            <button type="button" class="btn btn-success btn-sm add-product-btn" onclick="addProduct('${entityId}', '${entityName}')">
                <i class="fas fa-plus"></i> Add Product
            </button>
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
    
    // MODIFICATION 8: Update updateComplianceRequirements function
// Replace the existing function with this updated version:

function updateComplianceRequirements() {
    const container = document.getElementById('complianceRequirements');
    container.innerHTML = '';
    
    if (newClientRadio.checked) {
        // New client requirements - UPDATED
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
                    <input type="checkbox" id="finametricaQuestionnaire" name="compliance" value="FinametricaQuestionnaire">
                    <label for="finametricaQuestionnaire">Signed Finametrica Questionnaire to be uploaded to XPLAN</label>
                </div>
                
                <div class="checklist-item">
                    <input type="checkbox" id="finametricaReport" name="compliance" value="FinametricaReport">
                    <label for="finametricaReport">Finametrica Report to be uploaded to XPLAN</label>
                </div>
                
                <div class="checklist-item" id="superResearchItem">
                    <input type="checkbox" id="superResearch" name="compliance" value="SuperResearch">
                    <label for="superResearch">Super research confirmation</label>
                    <button type="button" class="btn btn-secondary btn-sm na-button" id="superResearchNABtn">N/A</button>
                </div>
                
                <div class="checklist-item" id="contributionHistoryItem" style="display: none; margin-left: 30px;">
                    <input type="checkbox" id="contributionHistory" name="compliance" value="ContributionHistory">
                    <label for="contributionHistory">Contribution history obtained</label>
                    <button type="button" class="btn btn-secondary btn-sm na-button" id="contributionHistoryNABtn">N/A</button>
                </div>
                
                <div class="checklist-item">
                    <input type="checkbox" id="taskXNewAdvice" name="compliance" value="TaskXNewAdvice">
                    <label for="taskXNewAdvice">TaskX - New Advice Request</label>
                </div>
            </div>
        `;
        container.innerHTML = newClientHTML;
    } else if (existingClientRadio.checked) {
        // Existing client requirements - UPDATED  
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
                
                <div class="checklist-item" id="superResearchItem">
                    <input type="checkbox" id="superResearch" name="compliance" value="SuperResearch">
                    <label for="superResearch">Super research confirmation</label>
                    <button type="button" class="btn btn-secondary btn-sm na-button" id="superResearchNABtn">N/A</button>
                </div>
                
                <div class="checklist-item" id="contributionHistoryItem" style="display: none; margin-left: 30px;">
                    <input type="checkbox" id="contributionHistory" name="compliance" value="ContributionHistory">
                    <label for="contributionHistory">Contribution history obtained</label>
                    <button type="button" class="btn btn-secondary btn-sm na-button" id="contributionHistoryNABtn">N/A</button>
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
    
    // Add event listener for super research checkbox and N/A buttons
    setTimeout(() => {
        const superResearchCheckbox = document.getElementById('superResearch');
        const contributionHistoryItem = document.getElementById('contributionHistoryItem');
        const superResearchNABtn = document.getElementById('superResearchNABtn');
        const contributionHistoryNABtn = document.getElementById('contributionHistoryNABtn');
        const superResearchItem = document.getElementById('superResearchItem');
        
        if (superResearchCheckbox && contributionHistoryItem) {
            superResearchCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    contributionHistoryItem.style.display = 'block';
                    // Remove N/A state when manually checking
                    if (superResearchItem) {
                        superResearchItem.classList.remove('na-active');
                    }
                } else {
                    contributionHistoryItem.style.display = 'none';
                    document.getElementById('contributionHistory').checked = false;
                    // Also remove N/A state from contribution history
                    contributionHistoryItem.classList.remove('na-active');
                }
                triggerAutoSave();
            });
        }
        
        setupAutoSaveForNewElements();
    }, 100);
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
        // Show coming soon modal or alert
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
    
    // MODIFICATION 9: Update Export to Word functionality
// Replace the existing exportWordBtn.addEventListener with this updated version:

exportWordBtn.addEventListener('click', function() {
    const clientName = document.getElementById('clientName').value || 'Client';
    
    // Build comprehensive Word document content with better formatting
    let wordContent = `
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2c3e50; font-size: 28pt; margin-bottom: 10px; font-weight: bold;">Statement of Advice Request Form</h1>
            <p style="color: #7f8c8d; font-size: 14pt; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
    `;
    
    // Get TMD value for flagging
    const tmdDetails = document.getElementById('tmdDetails').value;
    const tmdInFilenote = document.getElementById('tmdInFilenote') ? document.getElementById('tmdInFilenote').checked : false;
    
    // Helper function to check if critical fields are missing
    function checkMissingItems() {
        const missingItems = [];
        
        // Check TMD
        if (!tmdDetails || tmdDetails.trim() === '') {
            if (!tmdInFilenote) {
                missingItems.push('TMD');
            }
        }
        
        // Check Best Interests (can add more checks here)
        const goalAlignment = document.getElementById('goalAlignment').value;
        if (!goalAlignment || goalAlignment.trim() === '') {
            missingItems.push('Best Interests/Goal Alignment');
        }
        
        return missingItems;
    }
    
    const missingItems = checkMissingItems();
    
    // Add missing items flag at the top if any are missing
    if (missingItems.length > 0) {
        wordContent += `
            <div style="background-color: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin-bottom: 30px; border-radius: 5px;">
                <h3 style="color: #856404; margin-top: 0; margin-bottom: 10px;">⚠️ MISSING REQUIRED ITEMS</h3>
                <p style="color: #856404; margin: 0; font-weight: bold;">
                    The following items require attention: ${missingItems.join(', ')}
                </p>
            </div>
        `;
    }
    
    // Process each visible section with enhanced formatting
    document.querySelectorAll('.section').forEach(section => {
        if (section.style.display !== 'none') {
            const h2 = section.querySelector('h2');
            if (h2) {
                // Clean section title (remove icon)
                const sectionTitle = h2.textContent.replace(/^\s*[^\w\s]\s*/, '').trim();
                wordContent += `
                    <div style="margin-bottom: 30px; page-break-inside: avoid;">
                        <h2 style="color: #2c3e50; font-size: 20pt; margin-top: 30px; margin-bottom: 20px; 
                                   border-bottom: 3px solid #3498db; padding-bottom: 8px; font-weight: bold; page-break-after: avoid;">
                            ${sectionTitle}
                        </h2>
                `;
            }
            
            // Handle dynamic recommendations content first
            const dynamicContainer = section.querySelector('#recommendationsSectionsContainer');
            if (dynamicContainer) {
                const processedProducts = new Set();
                
                const processProductSection = (sectionEl) => {
                    const title = sectionEl.querySelector('h4');
                    if (title) {
                        wordContent += `<h3 style="color: #34495e; font-size: 16pt; margin-top: 25px; margin-bottom: 15px; font-weight: bold; page-break-after: avoid;">${title.textContent}</h3>`;
                    }
                    
                    sectionEl.querySelectorAll('.product-item').forEach(product => {
                        if (product.style.display !== 'none') {
                            const productHeader = product.querySelector('h5');
                            let hasProductContent = false;
                            let productContentHTML = '';
                            
                            product.querySelectorAll('input, textarea, select').forEach(input => {
                                if (input.value && input.value.trim() !== '' && input.style.display !== 'none') {
                                    const inputGroup = input.closest('.form-group');
                                    const inputLabel = inputGroup ? inputGroup.querySelector('label') : null;
                                    
                                    if (inputLabel) {
                                        let value = input.value;
                                        if (input.tagName === 'SELECT') {
                                            const selected = input.options[input.selectedIndex];
                                            value = selected ? selected.text : '';
                                        }
                                        if (input.type === 'checkbox') {
                                            const statusSpan = input.parentElement.nextElementSibling;
                                            value = statusSpan ? statusSpan.textContent : input.checked ? 'Yes' : 'No';
                                        }
                                        if (value && value !== 'Select investment option' && value !== '' && value !== 'Type to search products') {
                                            hasProductContent = true;
                                            productContentHTML += `
                                                <div style="margin-left: 20px; margin-bottom: 15px; page-break-inside: avoid;">
                                                    <strong style="color: #2c3e50; display: block; margin-bottom: 5px;">${inputLabel.textContent}</strong>
                                                    <div style="background-color: #f8f9fa; padding: 12px; border-left: 3px solid #3498db; margin-top: 5px; white-space: pre-wrap; line-height: 1.5;">
                                                        ${value}
                                                    </div>
                                                </div>
                                            `;
                                        }
                                    }
                                }
                            });
                            
                            if (hasProductContent && productHeader) {
                                wordContent += `
                                    <div style="page-break-inside: avoid;">
                                        <h4 style="color: #34495e; font-size: 14pt; margin-top: 20px; margin-bottom: 15px; 
                                                   background-color: #ecf0f1; padding: 10px; border-radius: 5px; page-break-after: avoid;">${productHeader.textContent}</h4>
                                        ${productContentHTML}
                                    </div>
                                `;
                            }
                        }
                    });
                };
                
                Array.from(dynamicContainer.children).forEach(child => {
                    if (child.style.display === 'none') return;
                    
                    if (child.classList.contains('recommendation-section')) {
                        const textareaDiv = child.querySelector('.recommendation-textarea');
                        const riskDiv = child.querySelector('.risk-profile-inline');
                        
                        if (textareaDiv) {
                            const label = textareaDiv.querySelector('label');
                            const textarea = textareaDiv.querySelector('textarea');
                            
                            if (label && textarea && textarea.value && textarea.value.trim() !== '') {
                                wordContent += `
                                    <div style="margin-bottom: 25px; page-break-inside: avoid;">
                                        <h4 style="color: #2c3e50; font-size: 14pt; margin-bottom: 10px; page-break-after: avoid;">${label.textContent}</h4>
                                        <div style="border: 1px solid #bdc3c7; padding: 15px; background-color: #f8f9fa; 
                                                    border-radius: 5px; white-space: pre-wrap; line-height: 1.6; page-break-inside: avoid;">
                                            ${textarea.value}
                                        </div>
                                    </div>
                                `;
                            }
                        }
                        
                        if (riskDiv) {
                            const riskLabel = riskDiv.querySelector('label');
                            const riskSelect = riskDiv.querySelector('select');
                            
                            if (riskLabel && riskSelect && riskSelect.value && riskSelect.value.trim() !== '') {
                                const selected = riskSelect.options[riskSelect.selectedIndex];
                                if (selected && selected.text && selected.text !== 'Select Risk Profile') {
                                    wordContent += `
                                        <div style="margin-bottom: 20px; page-break-inside: avoid;">
                                            <strong style="color: #2c3e50; display: block; margin-bottom: 8px;">${riskLabel.textContent}</strong>
                                            <span style="background-color: #e8f5e8; padding: 8px 15px; border-radius: 5px; display: inline-block;">
                                                ${selected.text}
                                            </span>
                                        </div>
                                    `;
                                }
                            }
                        }
                        
                        const next = child.nextElementSibling;
                        if (next && next.classList.contains('product-recommendations') && next.style.display !== 'none') {
                            processProductSection(next);
                            processedProducts.add(next);
                        }
                    } else if (child.classList.contains('product-recommendations') && !processedProducts.has(child)) {
                        processProductSection(child);
                    }
                });
            }
            
            // Process regular form groups with enhanced formatting
            section.querySelectorAll('.form-group').forEach(group => {
                if (group.style.display !== 'none' && !group.closest('#recommendationsSectionsContainer')) {
                    const label = group.querySelector('label');
                    
                    // Process radio groups
                    const radioGroup = group.querySelector('.radio-group');
                    if (radioGroup) {
                        const checkedRadio = radioGroup.querySelector('input[type="radio"]:checked');
                        if (checkedRadio && label) {
                            wordContent += `
                                <div style="margin-bottom: 20px; page-break-inside: avoid;">
                                    <strong style="color: #2c3e50; font-size: 12pt; display: block; margin-bottom: 8px;">${label.textContent}</strong>
                                    <div style="margin-left: 20px; margin-top: 8px;">
                            `;
                            const radioLabel = checkedRadio.nextElementSibling;
                            if (radioLabel) {
                                wordContent += `<span style="color: #27ae60; font-weight: bold;">● ${radioLabel.textContent}</span>`;
                            }
                            wordContent += `</div></div>`;
                        }
                    }
                    
                    // Process checkbox groups
                    const checkboxGroup = group.querySelector('.checkbox-group');
                    if (checkboxGroup) {
                        const checkedBoxes = checkboxGroup.querySelectorAll('input[type="checkbox"]:checked');
                        if (checkedBoxes.length > 0 && label) {
                            wordContent += `
                                <div style="margin-bottom: 20px; page-break-inside: avoid;">
                                    <strong style="color: #2c3e50; font-size: 12pt; display: block; margin-bottom: 8px;">${label.textContent}</strong>
                                    <div style="margin-left: 20px; margin-top: 8px;">
                            `;
                            checkedBoxes.forEach(checkbox => {
                                const checkboxLabel = checkbox.nextElementSibling;
                                if (checkboxLabel) {
                                    wordContent += `<div style="margin-bottom: 8px;"><span style="color: #27ae60; font-weight: bold;">✓</span> ${checkboxLabel.textContent}</div>`;
                                }
                            });
                            wordContent += `</div></div>`;
                        }
                    }
                    
                    // Process regular inputs with better separation
                    group.querySelectorAll('input[type="text"], input[type="date"], input[type="number"], textarea, select').forEach(input => {
                        if (input.style.display !== 'none' && 
                            !input.closest('.checkbox-group') && 
                            !input.closest('.radio-group') && 
                            !input.closest('.btn-group') && 
                            !input.closest('.product-item') && 
                            !input.closest('.recommendation-header') && 
                            input.value && input.value.trim() !== '') {
                            
                            const inputLabelEl = input.closest('.form-group').querySelector('label');
                            let labelText = inputLabelEl ? inputLabelEl.textContent : '';
                            
                            if (labelText) {
                                let value = input.value;
                                if (input.tagName === 'SELECT') {
                                    const selected = input.options[input.selectedIndex];
                                    value = selected ? selected.text : '';
                                }
                                if (value && value.trim() !== '' && value !== 'Select a saved draft...') {
                                    
                                    // Special handling for Alternative Strategies to start on new page
                                    let pageBreakBefore = '';
                                    if (labelText.includes('Alternatives - strategies')) {
                                        pageBreakBefore = 'page-break-before: always;';
                                    }
                                    
                                    wordContent += `
                                        <div style="margin-bottom: 25px; ${pageBreakBefore} page-break-inside: avoid;">
                                            <strong style="color: #2c3e50; font-size: 12pt; display: block; margin-bottom: 8px; page-break-after: avoid;">${labelText}</strong>
                                            <div style="border: 1px solid #bdc3c7; padding: 15px; background-color: #f8f9fa; 
                                                        border-radius: 5px; margin-top: 8px; white-space: pre-wrap; line-height: 1.6; page-break-inside: avoid;">
                                                ${value}
                                            </div>
                                        </div>
                                    `;
                                }
                            }
                        }
                    });
                    
                    // Process toggle switches
                    group.querySelectorAll('.yes-no-label').forEach(toggleGroup => {
                        const toggleLabel = toggleGroup.querySelector('label');
                        const toggleInput = toggleGroup.querySelector('input[type="checkbox"]');
                        if (toggleLabel && toggleInput) {
                            const status = toggleInput.checked ? 'Yes' : 'No';
                            const statusColor = toggleInput.checked ? '#27ae60' : '#e74c3c';
                            wordContent += `
                                <div style="margin-bottom: 20px; page-break-inside: avoid;">
                                    <strong style="color: #2c3e50; font-size: 12pt; display: inline-block; margin-right: 15px;">${toggleLabel.textContent}</strong>
                                    <span style="background-color: ${statusColor}; color: white; padding: 6px 15px; 
                                                 border-radius: 15px; font-weight: bold; font-size: 11pt;">
                                        ${status}
                                    </span>
                                </div>
                            `;
                        }
                    });
                }
            });
            
            // ALWAYS INCLUDE COMPLIANCE SECTIONS with comprehensive checklist display
            if (section.id === 'checklistSection') {
                wordContent += `
                    <div style="margin-top: 30px; page-break-inside: avoid;">
                        <h3 style="color: #e67e22; font-size: 16pt; margin-bottom: 15px; font-weight: bold; page-break-after: avoid;">
                            All Advice Documents
                        </h3>
                `;
                
                // Always show the static checklist items
                const staticItems = [
                    { id: 'factFind', label: 'Fact Find (dated within 12 months)' },
                    { id: 'filenote', label: 'Filenote' },
                    { id: 'pricingCalculator', label: 'Pricing Calculator' },
                    { id: 'beneficiaryNomination', label: 'Beneficiary nomination advice made (if relevant)' }
                ];
                
                staticItems.forEach(item => {
                    const checkbox = document.getElementById(item.id);
                    const checklistItem = checkbox ? checkbox.closest('.checklist-item') : null;
                    const isNA = checklistItem ? checklistItem.classList.contains('na-active') : false;
                    const isChecked = checkbox ? checkbox.checked : false;
                    
                    let status, statusColor, statusBg;
                    if (isNA) {
                        status = 'N/A';
                        statusColor = '#95a5a6';
                        statusBg = '#ecf0f1';
                    } else if (isChecked) {
                        status = '✓ Complete';
                        statusColor = '#27ae60';
                        statusBg = '#d5f4e6';
                    } else {
                        status = '○ Pending';
                        statusColor = '#e74c3c';
                        statusBg = '#fadbd8';
                    }
                    
                    wordContent += `
                        <div style="display: block; margin-bottom: 12px; padding: 12px; 
                                    background-color: ${statusBg}; border-radius: 5px; page-break-inside: avoid;">
                            <span style="color: ${statusColor}; font-weight: bold; margin-right: 15px; display: inline-block; min-width: 110px;">
                                ${status}
                            </span>
                            <span style="color: #2c3e50;">${item.label}</span>
                        </div>
                    `;
                });
                
                wordContent += `
                    </div>
                    <div style="margin-top: 30px; page-break-inside: avoid;">
                        <h3 style="color: #e67e22; font-size: 16pt; margin-bottom: 15px; font-weight: bold; page-break-after: avoid;">
                            Compliance Requirements
                        </h3>
                `;
                
                // Show compliance requirements based on client status
                const complianceContainer = document.getElementById('complianceRequirements');
                if (complianceContainer) {
                    complianceContainer.querySelectorAll('.checklist-item').forEach(item => {
                        const checkbox = item.querySelector('input[type="checkbox"]');
                        const checkboxLabel = item.querySelector('label');
                        
                        if (checkbox && checkboxLabel) {
                            const isNA = item.classList.contains('na-active');
                            const isChecked = checkbox.checked;
                            
                            let status, statusColor, statusBg;
                            if (isNA) {
                                status = 'N/A';
                                statusColor = '#95a5a6';
                                statusBg = '#ecf0f1';
                            } else if (isChecked) {
                                status = '✓ Complete';
                                statusColor = '#27ae60';
                                statusBg = '#d5f4e6';
                            } else {
                                status = '○ Pending';
                                statusColor = '#e74c3c';
                                statusBg = '#fadbd8';
                            }
                            
                            wordContent += `
                                <div style="display: block; margin-bottom: 12px; padding: 12px; 
                                            background-color: ${statusBg}; border-radius: 5px; page-break-inside: avoid;">
                                    <span style="color: ${statusColor}; font-weight: bold; margin-right: 15px; display: inline-block; min-width: 110px;">
                                        ${status}
                                    </span>
                                    <span style="color: #2c3e50;">${checkboxLabel.textContent}</span>
                                </div>
                            `;
                        }
                    });
                } else {
                    wordContent += `
                        <div style="padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px;">
                            <em style="color: #856404;">Compliance requirements will be determined based on client status selection.</em>
                        </div>
                    `;
                }
                
                wordContent += `</div>`;
            }
            
            wordContent += `</div>`;
        }
    });
    
    // Create enhanced Word document with better styling and no text bundling
    const html = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset="utf-8">
            <title>Financial Advice Request Form - ${clientName}</title>
            <style>
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
                p { 
                    margin-bottom: 15pt; 
                    text-align: justify;
                }
                div { 
                    margin-bottom: 12pt; 
                }
                strong { 
                    color: #2c3e50; 
                    font-weight: bold; 
                }
                @page { 
                    margin: 1in; 
                    font-size: 11pt;
                }
                .status-complete { background-color: #d5f4e6; color: #27ae60; }
                .status-pending { background-color: #fadbd8; color: #e74c3c; }
                .status-na { background-color: #ecf0f1; color: #95a5a6; }
                .no-wrap {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
            </style>
        </head>
        <body>
            ${wordContent}
            <div style="margin-top: 40px; text-align: center; border-top: 2px solid #bdc3c7; padding-top: 20px; page-break-inside: avoid;">
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
    
    showAutoSaveIndicator('Enhanced Word document exported successfully!');
});

    
   // MODIFICATION 10: Update Export to PDF functionality
// Replace the existing exportPdfBtn.addEventListener with this updated version:

exportPdfBtn.addEventListener('click', function() {
    console.log('=== STARTING PDF EXPORT ===');
    
    // Step 1: Hide elements that shouldn't be in PDF
    const elementsToHide = document.querySelectorAll('.draft-selector, .auto-save-indicator, .modal, .btn-group, .no-print');
    const originalDisplays = [];
    
    elementsToHide.forEach(el => {
        originalDisplays.push(el.style.display);
        el.style.display = 'none';
    });
    
    // Step 2: AGGRESSIVE TEXTAREA EXPANSION - Make ALL textareas show full content
    const allTextareas = document.querySelectorAll('textarea');
    const originalTextareaStyles = [];
    
    console.log('Found', allTextareas.length, 'textareas to expand');
    
    allTextareas.forEach((textarea, index) => {
        // Save ALL original styles
        originalTextareaStyles[index] = {
            height: textarea.style.height,
            minHeight: textarea.style.minHeight,
            maxHeight: textarea.style.maxHeight,
            overflow: textarea.style.overflow,
            resize: textarea.style.resize,
            boxSizing: textarea.style.boxSizing,
            padding: textarea.style.padding,
            border: textarea.style.border,
            lineHeight: textarea.style.lineHeight,
        };
        
        // FORCE reset to auto for accurate measurement
        textarea.style.height = 'auto';
        textarea.style.minHeight = 'auto';
        textarea.style.maxHeight = 'none';
        textarea.style.overflow = 'visible';
        textarea.style.resize = 'none';
        textarea.style.boxSizing = 'border-box';
        
        // Force a reflow to get accurate measurements
        textarea.offsetHeight;
        
        // Calculate the required height with extra padding for safety
        const scrollHeight = textarea.scrollHeight;
        const computedStyle = window.getComputedStyle(textarea);
        const paddingTop = parseInt(computedStyle.paddingTop);
        const paddingBottom = parseInt(computedStyle.paddingBottom);
        const borderTop = parseInt(computedStyle.borderTopWidth);
        const borderBottom = parseInt(computedStyle.borderBottomWidth);
        
        // Calculate total height needed (content + padding + borders + extra space)
        const totalHeight = scrollHeight + paddingTop + paddingBottom + borderTop + borderBottom + 20;
        
        // Set the calculated height
        textarea.style.height = totalHeight + 'px';
        textarea.style.minHeight = totalHeight + 'px';
        
        console.log(`Expanded textarea ${index}: scrollHeight: ${scrollHeight}, totalHeight: ${totalHeight}px`);
    });
    
    // Step 3: Hide empty form groups and sections to clean up the export
    const allFormGroups = document.querySelectorAll('.form-group');
    const hiddenFormGroups = [];
    
    allFormGroups.forEach((group, index) => {
        const inputs = group.querySelectorAll('input[type="text"], input[type="date"], input[type="number"], textarea, select');
        const checkboxes = group.querySelectorAll('input[type="checkbox"]:checked');
        const radios = group.querySelectorAll('input[type="radio"]:checked');
        
        let hasContent = false;
        
        // Check if any inputs have values
        inputs.forEach(input => {
            if (input.value && input.value.trim() !== '' && input.value !== 'Select a saved draft...') {
                hasContent = true;
            }
        });
        
        // Check if any checkboxes are checked
        if (checkboxes.length > 0) hasContent = true;
        
        // Check if any radios are checked
        if (radios.length > 0) hasContent = true;
        
        // Hide empty form groups (but keep important structural ones)
        if (!hasContent && !group.querySelector('.radio-group') && !group.querySelector('.checkbox-group') && !group.querySelector('h3, h4')) {
            hiddenFormGroups.push({
                element: group,
                originalDisplay: group.style.display
            });
            group.style.display = 'none';
        }
    });
    
    // Step 4: Add enhanced PDF-specific styles with page breaks for Alternative Strategies
    const pdfStyle = document.createElement('style');
    pdfStyle.id = 'pdf-export-style';
    pdfStyle.textContent = `
        @media print {
            body { 
                background: white !important; 
                padding: 0 !important; 
                font-size: 12pt !important;
                color: black !important;
                white-space: pre-wrap !important;
                word-wrap: break-word !important;
            }
            input[type="text"], input[type="date"], input[type="number"] {
                border: 1px solid #333 !important;
                background: white !important;
                color: black !important;
                font-size: 11pt !important;
            }
            select {
                border: 1px solid #333 !important;
                background: white !important;
                color: black !important;
                font-size: 11pt !important;
            }
            .product-item {
                page-break-inside: avoid !important;
                margin-bottom: 10pt !important;
                border: 1px solid #333 !important;
                background: white !important;
            }
            .checklist-item {
                page-break-inside: avoid !important;
                background: #f5f5f5 !important;
            }
            .no-print, .btn-group, .draft-selector, .auto-save-indicator {
                display: none !important;
            }
            h1, h2, h3, h4 {
                color: black !important;
                page-break-after: avoid !important;
            }
            label {
                color: black !important;
                font-weight: bold !important;
            }
            /* Specific targeting for Alternative Strategies section */
            label[for="alternativeStrategies"] {
                page-break-before: always !important;
            }
        }
    `;
    document.head.appendChild(pdfStyle);
    
    // Step 5: Set document title for PDF filename
    const originalTitle = document.title;
    const clientName = document.getElementById('clientName').value || 'Client';
    document.title = `Financial_Advice_Request_Form_${clientName.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    console.log('PDF setup complete - triggering print dialog');
    
    // Step 6: Trigger print dialog with longer delay to ensure all rendering is complete
    setTimeout(() => {
        window.print();
    }, 1000);
    
    // Step 7: Comprehensive cleanup after print
    const cleanupAfterPrint = () => {
        console.log('=== CLEANING UP AFTER PDF EXPORT ===');
        
        // Remove PDF styles
        const pdfStyleElement = document.getElementById('pdf-export-style');
        if (pdfStyleElement) {
            pdfStyleElement.remove();
        }
        
        // Restore original title
        document.title = originalTitle;
        
        // Restore hidden elements
        elementsToHide.forEach((el, index) => {
            el.style.display = originalDisplays[index];
        });
        
        // RESTORE ALL TEXTAREA STYLES
        allTextareas.forEach((textarea, index) => {
            if (originalTextareaStyles[index]) {
                const originalStyles = originalTextareaStyles[index];
                textarea.style.height = originalStyles.height || '';
                textarea.style.minHeight = originalStyles.minHeight || '';
                textarea.style.maxHeight = originalStyles.maxHeight || '';
                textarea.style.overflow = originalStyles.overflow || '';
                textarea.style.resize = originalStyles.resize || '';
                textarea.style.boxSizing = originalStyles.boxSizing || '';
                textarea.style.padding = originalStyles.padding || '';
                textarea.style.border = originalStyles.border || '';
                textarea.style.lineHeight = originalStyles.lineHeight || '';
            }
            console.log(`Restored textarea ${index} to original styles`);
        });
        
        // Restore hidden form groups
        hiddenFormGroups.forEach(({ element, originalDisplay }) => {
            element.style.display = originalDisplay;
        });
        
        console.log('=== PDF EXPORT CLEANUP COMPLETE ===');
        showAutoSaveIndicator('PDF export complete - all elements restored!');
    };
    
    // Listen for print events
    window.addEventListener('afterprint', cleanupAfterPrint, { once: true });
    
    // Fallback cleanup after 20 seconds (in case print dialog is cancelled)
    setTimeout(cleanupAfterPrint, 20000);
});
            }
            .container { 
                box-shadow: none !important; 
                max-width: 100% !important; 
                margin: 0 !important; 
                padding: 15px !important;
                background: white !important;
            }
            .section { 
                page-break-inside: avoid !important; 
                margin-bottom: 15pt !important;
                background: white !important;
                box-shadow: none !important;
            }
            /* Force Alternative Strategies to start on new page */
            .section h2:contains("Strategy Recommendations") ~ .form-group label:contains("Alternatives - strategies") {
                page-break-before: always !important;
            }
            /* Alternative fallback using specific targeting */
            #alternativeStrategies {
                page-break-before: auto !important;
            }
            #alternativeStrategies:first-of-type {
                page-break-before: always !important;
            }
            textarea {
                border: 1px solid #333 !important;
                background: white !important;
                overflow: visible !important;
                resize: none !important;
                page-break-inside: avoid !important;
                font-family: inherit !important;
                font-size: 11pt !important;
                line-height: 1.3 !important;
                color: black !important;
