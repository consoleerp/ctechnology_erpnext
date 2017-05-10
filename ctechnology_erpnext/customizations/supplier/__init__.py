import frappe

def before_naming(self, method):	
	if not self.territory:
		frappe.throw(_("Please select territory"))
		
	abbr = frappe.db.get_value('Territory', filters={'name': self.territory}, fieldname='consoleerp_abbr')
	if not abbr:
		frappe.throw("Define abbreviation for territory")
	
	self.naming_series = "SUPP-" + abbr + "-"		
	