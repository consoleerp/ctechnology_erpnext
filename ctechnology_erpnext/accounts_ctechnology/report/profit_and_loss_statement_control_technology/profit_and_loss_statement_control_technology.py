# Copyright (c) 2013, ConsoleERP and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt
from erpnext.accounts.report.financial_statements import (get_period_list, get_columns, get_data)
from erpnext.accounts.report.profit_and_loss_statement.profit_and_loss_statement import get_net_profit_loss, get_chart_data

def execute(filters=None):
	period_list = get_period_list(filters.from_fiscal_year, filters.to_fiscal_year, 
		filters.periodicity, filters.accumulated_values, filters.company)

	income = get_data(filters.company, "Income", "Credit", period_list, filters = filters,
		accumulated_values=filters.accumulated_values, 
		ignore_closing_entries=True, ignore_accumulated_values_for_fy= True)
		
	expense = get_data(filters.company, "Expense", "Debit", period_list, filters=filters,
		accumulated_values=filters.accumulated_values, 
		ignore_closing_entries=True, ignore_accumulated_values_for_fy= True)	

	net_profit_loss = get_net_profit_loss(income, expense, period_list, filters.company)

	cost_of_goods_entries, expense = extract_cost_of_goods_sold(expense)
	print(expense[0])
	data = []
	data.extend(income or [])
	data.extend(cost_of_goods_entries or [])
	data.extend(expense or [])
	if net_profit_loss:
		data.append(net_profit_loss)

	columns = get_columns(filters.periodicity, period_list, filters.accumulated_values, filters.company)

	chart = get_chart_data(filters, columns, income, expense, net_profit_loss)

	return columns, data, None, chart

def extract_cost_of_goods_sold(expense):
	root_acc = frappe.db.get_single_value('Control Technology Settings', 'cost_of_goods_root')
	if not root_acc:
		return None, expense	
	cost_of_goods_entries = []
	new_expense = []
	cost_of_goods_root_indent = -1
	cost_of_goods_root_indent_delta = 0		# to shift to the right
	# cant remove from iterating list- weird results.
	# might have to do the for i in range() method-- tried n failed	
	for r in expense:				
		if r.get("account", '') == root_acc:
			cost_of_goods_root_indent = r["indent"]
			cost_of_goods_root_indent_delta = r["indent"]
			r["indent"] = 0
			r["parent_account"] = None
			cost_of_goods_entries.append(r)			
		elif cost_of_goods_root_indent != -1 and r.get("indent", None):
			if r["indent"] <= cost_of_goods_root_indent:
				cost_of_goods_root_indent = -1
			else:
				r["indent"] -= cost_of_goods_root_indent_delta
				cost_of_goods_entries.append(r)				
		else:
			new_expense.append(r)
	
	cost_of_goods_entries.append({})
	return cost_of_goods_entries, new_expense