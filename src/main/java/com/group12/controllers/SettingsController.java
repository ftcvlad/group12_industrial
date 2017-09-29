package com.group12.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.group12.beans.DataUpload;
import com.group12.models.UploadModel;
import com.group12.beans.YoyoTransaction;

@WebServlet(name = "SettingsController", urlPatterns = { "settings" })
public class SettingsController extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		

		request.setAttribute("page", "settings");
		request.getRequestDispatcher("settings.jsp").forward(request, response);
	}

	
	
	

}
