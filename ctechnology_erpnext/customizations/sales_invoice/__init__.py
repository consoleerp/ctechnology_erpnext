import frappe, ast

@frappe.whitelist()
def submit_invoices(invoices):
	if not invoices:
		frappe.msgprint("Pls select the invoices to submit");
	
	invoices = ast.literal_eval(invoices)
	failed_docs = []
	
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
			frappe.throw('Validation Error. <b>None submitted</b>')
			
	if no_error:
		frappe.msgprint("Success.\nPlease refresh the page.")