package com.group12.controllers;


import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.group12.models.DataUpload;
import com.group12.models.RetailModel;


@WebServlet(name = "ServletExample", urlPatterns = { "graphVlad" }, loadOnStartup = 1)
public class GraphController extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		List<DataUpload> allUploads = RetailModel.getAllDataUploads();

		request.setAttribute("page", "graphs1");
		//request.setAttribute("allDataUploads", allUploads);
		request.getRequestDispatcher("graphs/graphVlad.jsp").forward(request, response);
	}
}