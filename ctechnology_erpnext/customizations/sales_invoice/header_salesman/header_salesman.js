// takes header salesman and submits it in the table below
// call this before_save
function headerSalesman(frm){
	var doc = frm.doc;
	doc.sales_team = [];
	
	// just leave emoty if no sales person
	if (!doc.consoleerp_sales_person)
		return;
	
	var sales_team = frappe.model.add_child(doc, "Sales Team", "sales_team");
	// refresh right after
	refresh_field("sales_team");
	
	// set sales person
	frappe.model.set_value("Sales Team", sales_team.name, "sales_person", doc.consoleerp_sales_person);
	// incentives 100%
	frappe.model.set_value("Sales Team", sales_team.name, "allocated_percentage", 100);
	// refresh
	
}