export const dashboardLocators = {
    // General locators
    dashboardTitle: '//div[span[contains(text(), "Dashboard")]]',
    questionMarkIcon: '[data-testid="QuestionMarkIcon"]',
    boAdminText: '//span[contains(text(), "Bo Admin")]',
    
    // Menu locators
    menuLinks: {
        dashboard: 'text=Dashboard',
        organizations: 'text=Organizations',
        users: 'text=Users',
        units: 'text=Units',
        scans: 'text=Scans',
        errorsLog: 'text=Errors Log',
        inventory: 'text=Inventory',
        versions: 'text=Versions',
        reports: 'text=Reports',
        trainings: 'text=Trainings',
        alerts: 'text=Alerts',
        supportCalls: 'text=Support Calls'
    },
    
    //Tabs locators
    tabs: {
        general: 'text=General',
        performance: 'text=Performance'
    },
    
    //buttons locators
    buttons: {
        addNew: 'button:has-text("Add New")',
        save: 'button:has-text("Save")'
    }
}; 