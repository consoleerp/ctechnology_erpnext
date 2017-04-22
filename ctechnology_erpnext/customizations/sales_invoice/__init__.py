import frappe, ast
import consoleerp_erpnext_client

@frappe.whitelist()
def submit_invoices(invoices):
	"""
	Submits all the invoices present in the list
	"""
	if not invoices:
		frappe.msgprint("Pls select the invoices to submit");
	
	# converting string to list obj
	invoices = ast.literal_eval(invoices)
	
	no_error = True
	for i in invoices:
		try:			
			doc = frappe.get_doc("Sales Invoice", i)
			if doc.docstatus == 0:
				doc.submit()
			else:
				frappe.msgprint("This document is already submitted or cancelled: " + i)
		except:
			no_error = False
			frappe.msgprint("Error in Sales Invoice: " + i)
			# throwing again so its not validated
			frappe.throw('Validation Error. <b>None submitted</b>')
			
	if no_error:
		frappe.msgprint("Success.\nPlease refresh the page.")
		
		
def validate(self, method):	
	# item stock validations
	import consoleerp_erpnext_client.customizations.item_stock_validation	
	consoleerp_erpnext_client.customizations.item_stock_validation.validate(self, method)
	