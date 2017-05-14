import frappe

def validate(self, method):	
	# customer code set by user
	# if customer is setting the code, naming series may not follow, and may not be unique
	if self.supplier_code:
		return

	if not self.territory:
		frappe.throw(_("Please select territory"))
		
	abbr = frappe.db.get_value('Territory', filters={'name': self.territory}, fieldname='consoleerp_abbr')
	if not abbr:
		frappe.throw("Define abbreviation for territory")
	
	# frappe naming module
	from frappe.model.naming import getseries
	# takes key, number of digits as args	
	naming_series = "SUPP-" + abbr + "-"
	self.supplier_code = naming_series + getseries(naming_series, 5)
	