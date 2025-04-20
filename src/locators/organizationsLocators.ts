export const organizationsLocators = {
    // כותרות
    pageTitle: 'h1:has-text("Bucket Manufacture")',
    
    // שדות חיפוש וסינון
    searchBox: '//input[@id="SearchBox-label"]',
    statusFilter: 'select[name="status"]',
    
    // טבלה
    table: {
        rows: 'table tbody tr',
        statusCell: 'td:last-child'
    },
    
    // שדות טופס
    form: {
        name: 'input[name="name"]',
        email: 'input[name="email"]',
        phone: 'input[name="phone"]'
    },
    
    // כפתורים
    buttons: {
        addNew: 'button:has-text("Add New")',
        save: 'button:has-text("Save")'
    }
}; 