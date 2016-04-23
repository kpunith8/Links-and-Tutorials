// GCD

public int egcd(int a, int b) {
    if (a == 0)
        return b;

    while (b != 0) {
        if (a > b)
            a = a - b;
        else
            b = b - a;
    }

    return a;
}

public static String readFile(String fileName) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(fileName));
		try {
			StringBuilder sb = new StringBuilder();
			String line = br.readLine();

			while (line != null) {
				sb.append(line);
				sb.append("\n");
				line = br.readLine();
			}
			return sb.toString();
		} finally {
			br.close();
		}
	}
	
	/*
		BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

		String inputLine = "";

		if (!file.exists()) {
			file.createNewFile();
		}
		FileWriter fw = new FileWriter(file.getAbsoluteFile());
		BufferedWriter bw = new BufferedWriter(fw);

		while ((inputLine = in.readLine()) != null) {

			// System.out.println(inputLine);
			bw.write(inputLine);
			bw.close();

		}
	*/
	
		/*
		 * Set<Entry<Integer, Boolean>> mapSet = bulbsWithState.entrySet();
		 * Iterator<Entry<Integer, Boolean>> mapIterator = mapSet.iterator();
		 * while (mapIterator.hasNext()) {
		 * 
		 * Entry<Integer, Boolean> mapEntry = mapIterator.next(); //Integer
		 * keyValue = mapEntry.getKey(); Boolean value = mapEntry.getValue();
		 * 
		 * if (value == true) { bulbCount++; } }
		 */
		/*
		 * for (Boolean item : bulbsWithState.values()) {
		 * if(item.valueOf(true)){ bulbCount++; } }
		 */
		 
		 
		 // Sample matrix test
		 //sample = addElements(key.intValue(), value.intValue());
		int[][] sample1 = new int[20] [20];
		int count = 1;
		for (int kk = 0; kk < k; kk++) {

			for (int ll = 0; ll < v; ll++) {
				
						sample1[kk][ll] = count++;	
			}
		}
		
		for (int kk = 0; kk < k; kk++) {

			for (int ll = 0; ll < v; ll++) {
				
						System.out.print(sample1[kk][ll] + " ");	
			}
			System.out.println();
		}
	
	// find factor 
	/*
		 int factorNumber = 1;
		  
		 while (factorNumber <= n) { if (n % factorNumber == 0) {
		 System.out.println(factorNumber); } factorNumber++; }
		 
		 
		 
		 /*
	private static String FindBestSelection(String studentPreference, List<Preference<String, String>> hospitalPrefs) {
		// TODO Auto-generated method stub

		// int rank = 100;
		Preference<String, String> preferer = new Preference<String, String>(null, null, 0);

		for (Preference<String, String> hospitalPreference : hospitalPrefs) {
			if (hospitalPreference.getPreferred().equalsIgnoreCase(studentPreference)) {
				// if (hospitalPreference.getValue() < rank)
				// rank = hospitalPreference.getValue();

				preferer = hospitalPreference;
			}
		}

		return preferer.getPreferrer();

	}
	*/
	
	// Using FormToolKit in RCP View
	
	/*
		toolKit = new FormToolkit(parent.getDisplay());
		form = toolKit.createScrolledForm(parent);

		// Create Grid layout to add data
		
		GridLayout gLayoyt = new GridLayout();
		form.getBody().setLayout(gLayoyt);
		gLayoyt.numColumns = 1;

		GridData gData = new GridData();
		gData.horizontalSpan = 5;

		form.setLayoutData(gData);
		
		Label label = toolKit.createLabel(form.getBody(), "Name");
		/*
		Label label = new Label(form.getBody(), SWT.NULL);
		label.setText("Name");
		//
		Text text = new Text(form.getBody(), SWT.BORDER);
		text.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		
		/*
		Label label1 = new Label(form.getBody(), SWT.NULL);
		label1.setText("Description");
		//
		
		Label label1 = toolKit.createLabel(form.getBody(), "Description");
		
		Text textDesc = new Text(form.getBody(), SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
		GridData gridData = new GridData(SWT.FILL, SWT.CENTER, true, false);
		
		// Specify Height of TextField to 75 pixels
		gridData.heightHint = 75;
		
		textDesc.setLayoutData( gridData);//new GridData(GridData.FILL_HORIZONTAL));
		
		/* Create GridLayout with 2 columns to add Label and
		 * Read only text
		 //
		
		GridLayout gLayoyt1 = new GridLayout();
		form.getBody().setLayout(gLayoyt1);
		gLayoyt1.numColumns = 2;

		GridData gData1 = new GridData();
		gData1.horizontalSpan = 1;

		form.setLayoutData(gData);
		
		Button button = toolKit.createButton(form.getBody(), "Execution Times", SWT.CHECK);
		
		Text readonlyText = new Text(form.getBody(), SWT.BORDER | SWT.READ_ONLY);
		readonlyText.setText("1");
		readonlyText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		
        Button okBtn = new Button(form.getBody(), SWT.PUSH);
        okBtn.setSize(new Point(100,100));
        okBtn.setText("OK");
        okBtn.setLayoutData(new GridData(SWT.RIGHT, SWT.CENTER, false, false, 0, 0));
        
        Button cancBtn = new Button(form.getBody(), SWT.PUSH);
    
        cancBtn.setSize(new Point(100,100));
        cancBtn.setText("Cancel");
        cancBtn.setLayoutData(new GridData(SWT.RIGHT, SWT.CENTER, false, false, 1, 1));
		*/
		
		/*
		text.addModifyListener(new ModifyListener(){
		      public void modifyText(ModifyEvent event) {
		        // Get the widget whose text was modified
		        Text text = (Text) event.widget;
		        System.out.println(text.getText());
		      }
		    });
		*/
		
		final String textS = text.getText();
		cancelBtn.addSelectionListener(new SelectionAdapter() {
			
			public void widgetSelected(SelectionEvent e) {
				
				System.out.println("X: " + textS);
			}
		});
	
	// Mouse Listener
	cancelBtn.addMouseListener(new MouseListener() {
			
			@Override
			public void mouseUp(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mouseDown(MouseEvent e) {
				// TODO Auto-generated method stub
				if(text.getText() != ""){
					MessageDialog.openConfirm(top.getShell(), "Test Window ", text.getText());
					
				}
			}
			
			@Override
			public void mouseDoubleClick(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}
		});
		
		// FormLayout to align the buttons
		FormLayout fLayout = new FormLayout();
		bottom1.setLayout(fLayout);

		/*
		FormData addData = new FormData(80, 30);
		addData.right = new FormAttachment(okBtn, -5, SWT.LEFT);
		addData.bottom = new FormAttachment(okBtn, 0, SWT.BOTTOM);
		addBtn.setLayoutData(addData);

		FormData cancelData = new FormData(80, 30);
		cancelData.right = new FormAttachment(98);
		cancelData.bottom = new FormAttachment(95);
		cancelBtn.setLayoutData(cancelData);

		FormData okData = new FormData(80, 30);
		okData.right = new FormAttachment(cancelBtn, -5, SWT.LEFT);
		okData.bottom = new FormAttachment(cancelBtn, 0, SWT.BOTTOM);
		okBtn.setLayoutData(okData);

		 */
		
			/*
		Composite bottom = new Composite(top, SWT.NONE);
		GridLayout gLayoyt1 = new GridLayout(4, true);

		bottom.setLayout(gLayoyt1);
		// bottom.setLayoutData(new GridData(SWT.RIGHT, SWT.TOP, true, true));

		GridData gData1 = new GridData();
		gData1.horizontalSpan = 1;

		gData1.horizontalAlignment = GridData.FILL;
		gData1.verticalAlignment = GridData.FILL;
		gData1.grabExcessVerticalSpace = true;
		gData1.grabExcessHorizontalSpace = true;
		 */
		// bottom.setLayoutData(gData1);
		 
		 
		 /********************** Sample Screen Given By Mustak Code (Using RCP Plugin)********************/
		 /*
		Label labelName = new Label(top, SWT.NULL);
		labelName.setText("Name");

		final Text text = new Text(top, SWT.BORDER);
		text.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));

		Label labelDescription = new Label(top, SWT.NULL);
		labelDescription.setText("Description");

		Text textDesc = new Text(top, SWT.MULTI | SWT.BORDER | SWT.WRAP
				| SWT.V_SCROLL);
		GridData gridData = new GridData(SWT.FILL, SWT.CENTER, true, false);
		
		// Specify Height of TextField to 75 pixels
		gridData.heightHint = 75;
		textDesc.setLayoutData(gridData);

		Button buttonCheck = new Button(top, SWT.CHECK);
		buttonCheck.setText("Execution times");
		buttonCheck.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));    

		Text readonlyText = new Text(top, SWT.BORDER | SWT.READ_ONLY);
		readonlyText.setText("1");
		readonlyText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));  

		// Composite to add Buttons in a FormLayout

		Composite bottom1 = new Composite(top, SWT.SHELL_TRIM | SWT.CENTER);
		bottom1.layout(true);
		
		RowLayout rowLayout = new RowLayout(SWT.HORIZONTAL);
		rowLayout.marginTop = 10;
        rowLayout.marginBottom = 10;
        rowLayout.marginLeft = 320;
        rowLayout.wrap = true;
        rowLayout.pack = true;
        
        rowLayout.marginRight = 5;
        rowLayout.spacing = 10;
        
        rowLayout.justify = true;
        bottom1.setLayout(rowLayout);
        
        
		
		final Button addBtn = new Button(bottom1, SWT.PUSH);
		addBtn.setText("Add");
		addBtn.setLayoutData(new RowData(80, 30));

		final Button okBtn = new Button(bottom1, SWT.PUSH);
		okBtn.setText("Ok");
		okBtn.setLayoutData(new RowData(80, 30));

		Button cancelBtn = new Button(bottom1, SWT.PUSH);
		cancelBtn.setText("Cancel");
		cancelBtn.setLayoutData(new RowData(80, 30));

		// Disable Buttons on startup
		addBtn.setEnabled(false);
		okBtn.setEnabled(false);

		// Listener to Enable the Buttons upon TextField Changes
		textDesc.addModifyListener(new ModifyListener() {

			@Override
			public void modifyText(ModifyEvent e) {
				// TODO Auto-generated method stub
				addBtn.setEnabled(true);
				okBtn.setEnabled(true);
			}
		});
		*/
		
		
		// Buttons alignment
		
		/*
		Composite dialog1 = new Composite(dialog, SWT.NONE);
		RowLayout row = new RowLayout();
		dialog1.setLayout(row);
	
		Button buttonLogin = new Button(dialog1, SWT.PUSH);
		buttonLogin.setText("Login");
		buttonLogin
				.setLayoutData(new RowData(60, 30));
		
		Button buttonCancel = new Button(dialog1, SWT.PUSH);
		buttonCancel.setText("Cancel");
		buttonCancel
				.setLayoutData(new RowData(60, 30));
		
		
		/*
		
		Composite bottom1 = new Composite(parent, SWT.SHELL_TRIM | SWT.CENTER);
		FormLayout fLayout = new FormLayout();
		bottom1.setLayout(fLayout);

		final Button buttonLogin = new Button(bottom1, SWT.PUSH);
		buttonLogin.setText("Login");
	
		Button buttonCancel = new Button(bottom1, SWT.PUSH);
		buttonCancel.setText("Cancel");

		FormData addData = new FormData(80, 30);
		addData.right = new FormAttachment(buttonCancel, -5, SWT.LEFT);
		addData.bottom = new FormAttachment(buttonCancel, 0, SWT.BOTTOM);
		buttonLogin.setLayoutData(addData);
	
		FormData cancelData = new FormData(80, 30);
		cancelData.right = new FormAttachment(98);
		cancelData.bottom = new FormAttachment(95);
		buttonCancel.setLayoutData(cancelData);

		*/
		
		// Align button to center in Grid
		
		Button buttonLogin = new Button(top, SWT.PUSH);
		buttonLogin.setText("Click here to login"); // $NON-NLS-1$
		buttonLogin.setLayoutData(new GridData(SWT.CENTER, SWT.TOP, true, false));
		
		/***** Hiding and showing a view in RCP *******/
		
				IWorkbenchPage activePage = PlatformUI.getWorkbench()
						.getActiveWorkbenchWindow().getActivePage();
					
				try {
					activePage.showView(AppConstants.LOGIN_VIEW_ID); // $NON-NLS-1$
				} catch (PartInitException e1) {
					e1.getMessage();
				} finally {
					activePage.hideView(activePage.findView(AppConstants.MAIN_VIEW_ID));	// $NON-NLS-1$
				}
				
				
// Dialog box in SWT
if(emptyUserId){
					MessageDialog.openConfirm(dialog, "Error!",
							"User ID shouldn't be empty!"); // $NON-NLS-1$ $NON-NLS-2$
				} else if (emptyPassword){
					MessageDialog.openConfirm(dialog, "Error!",
							"Password shouldn't be empty!"); // $NON-NLS-1$ $NON-NLS-2$
				}
				
				
// DB test
int userPriority = rs.getInt("login_priority"); // $NON-NLS-1$

if (userPriority == 0) {
	System.out.println("We are in Admin page"); // $NON-NLS-1$
	return true;
} else if (userPriority == 1) {
	System.out.println("We are in Mentor page"); // $NON-NLS-1$
	return true;
} else {
	System.out.println("We are in user page"); // $NON-NLS-1$
	return true;
}


// text verify listener to not to allow user to type some chars

uText.addVerifyListener(new VerifyListener() {

	        @Override
	        public void verifyText(VerifyEvent e) {
	           if( Character.isDigit(e.character)
	            || Character.isWhitespace(e.character)
	            || e.keyCode == SWT.ARROW_LEFT
	            || e.keyCode == SWT.ARROW_RIGHT
	            || e.keyCode == SWT.BS) {
	        	   e.doit = false;
	            }
	        }
	        });
				
				
				
/** window Close button listener ***/
dialog.addListener(SWT.Close, new Listener() {
		
		@Override
		public void handleEvent(Event event) {
			dialog.dispose();
		}
	});
	

/*** Button created in LoginPopup ***/
		/*
		Composite btncomposite = new Composite(dialog, SWT.NONE);
		btncomposite.setLayout(new GridLayout(6, false));

		Button buttonLogin = new Button(btncomposite, SWT.PUSH);
		GridData gdLogin = new GridData();
		gdLogin.widthHint = 80;
		gdLogin.heightHint = 30;
		gdLogin.horizontalAlignment = SWT.RIGHT;
		buttonLogin.setText(resourceBundle.getString("buttonLogin")); // $NON-NLS-1$
		buttonLogin.setLayoutData(gdLogin);

		Button buttonCancel = new Button(btncomposite, SWT.PUSH);
		GridData gdCancel = new GridData();
		gdCancel.widthHint = 80;
		gdCancel.heightHint = 30;
		gdCancel.horizontalAlignment = SWT.LEFT;
		buttonCancel.setText(resourceBundle.getString("buttonCancel")); // $NON-NLS-1$
		buttonCancel.setLayoutData(gdCancel);

		new Label(btncomposite, SWT.NONE);
		new Label(btncomposite, SWT.NONE);
		*/	
		
		labelUserid = new Label(dialog, SWT.CENTER);
		labelUserid.setLayoutData(new GridData(SWT.FILL, SWT.RIGHT, true, false));
		
	/****** ProcessSearchRequest() to search both epicID and epic title *********/
	/**** mysql column is converted integer to string ****/
	
	public List<Epic> processSearchRequest(String epicTitle) {
		List<Epic> epicList = new ArrayList<Epic>();
		Epic epic = null;

		String epicIdString = epicTitle.substring(4);
		String epicStart = epicTitle.substring(0, 4);
		int epicId = Integer.parseInt(epicIdString);
		System.out.println("epicID : " + epicId);
		System.out.println("epicIdString : " + epicIdString);
		System.out.println("epicStart : " + epicStart);

		try {
			connection = databaseConnection.establishConnection();
			String query = "SELECT * FROM iterationdb.epic WHERE CONVERT(epic_id, char) LIKE ?"; // $NON-NLS-1$

			if (connection == null) {
				System.out.println(resourceBundle
						.getString("UserLogin.databaseError")); // $NON-NLS-1$
			} else {

				if (epicStart.equalsIgnoreCase("epic")) {

					preparedStatement = connection.prepareStatement(query);
					preparedStatement.setString(1, epicIdString + "%"); // $NON-NLS-1$
																		// $NON-NLS-2$
					resultSet = preparedStatement.executeQuery();

					while (resultSet.next()) {
						epic = new Epic();
						epic.setEpicID(resultSet.getInt("epic_id")); // $NON-NLS-1$
						epic.setEpicTitle(resultSet.getString("epic_title")); // $NON-NLS-1$
						System.out
								.println("Epic ID from processSearchRequest() - "
										+ epic.getEpicID()
										+ ", Epic Title: "
										+ epic.getEpicTitle());
						epicList.add(epic);
					}
				} else if (epicStart.startsWith(epicTitle)) {
					String query1 = "SELECT * FROM iterationdb.epic WHERE epic_title LIKE ?"; // $NON-NLS-1$

					preparedStatement = connection.prepareStatement(query1);
					preparedStatement.setString(1, epicTitle + "%"); // $NON-NLS-1$
																		// $NON-NLS-2$
					resultSet = preparedStatement.executeQuery();
					while (resultSet.next()) {
						epic = new Epic();
						epic.setEpicID(resultSet.getInt("epic_id")); // $NON-NLS-1$
						epic.setEpicTitle(resultSet.getString("epic_title")); // $NON-NLS-1$
						System.out
								.println("Epic ID from processSearchRequest() - "
										+ epic.getEpicID()
										+ ", Epic Title: "
										+ epic.getEpicTitle());
						epicList.add(epic);
					}
				}
			}
		} catch (Exception e) {
			System.out.println("Exception in Epic DAO - search- "
					+ e.getMessage());
		} finally {
			try {
				if (connection != null) {
					connection.close();
				}
				if (preparedStatement != null) {
					statement.close();
				}
			} catch (SQLException e) {
				e.getMessage();
			}
		}
		return epicList;
	}

	
	//
	items[i].setText(0, "EPIC" + String.valueOf(epicList.get(i).getEpicID()));
	
	//*********************** Creating messageBox with ok and cancel button ****************************//
	
	MessageBox messageBox = new MessageBox(newComposite
							.getShell(), SWT.ICON_WARNING | SWT.OK | SWT.CANCEL);
					messageBox.setText(resourceBundle
							.getString("EpicView.warningMessage"));
					messageBox.setMessage(resourceBundle
							.getString("EpicView.deleteWarningMessage")); // $NON-NLS-1$
																			// $NON-NLS-2$
					int returnCode = messageBox.open();
					switch (returnCode) {
					case SWT.OK:
						Epic epic = new Epic();
						epic.setEpicID(Integer.parseInt(item.getText(0)));
						epic.setEpicTitle(item.getText(1));
						epic.setEpicDescription(item.getText(2));
						boolean deletionStatus = epicController
								.processDeleteRequest(epic);
						if (deletionStatus) {
							message.setText(resourceBundle
									.getString("EpicView.deleteSuccess")); // $NON-NLS-1$
							deleteButton.dispose();
							item.dispose();
							newComposite.layout(true, true);
						}
						break;
					case SWT.CANCEL:
						break;
					}
					
					
					

 \\grdfilesrvblr03\automated testing\mustak\html result folder
 
 
 // To list all the employees
 
 @Override
 public List<Employee> processAddRequest() {
		List<Employee> empList = new ArrayList<Employee>();
		Employee employee = null;

		try {
			connection = databaseConnection.establishConnection();
			String query = "SELECT * FROM iterationdb.employee"; // $NON-NLS-1$

			if (connection == null) {
				System.out.println(resourceBundle
						.getString("UserLogin.databaseError")); // $NON-NLS-1$
			} else {
				preparedStatement = connection.prepareStatement(query);
				resultSet = preparedStatement.executeQuery();
				while (resultSet.next()) {
					employee = new Employee();
					employee.setEmpID(resultSet.getString("employee_id")); // $NON-NLS-1$
					employee.setEmpName(resultSet.getString("employee_name")); // $NON-NLS-1$
					employee.setEmpPrivilege(resultSet
							.getString("employee_privileges")); // $NON-NLS-1$
					empList.add(employee);
				}
			}
		} catch (Exception e) {
			System.out.println("Exception in Epic DAO - add - "
					+ e.getMessage());
		} finally {
			try {
				if (connection != null) {
					connection.close();
				}
				if (preparedStatement != null) {
					statement.close();
				}
				if (resultSet != null) {
					resultSet = null;
				}
			} catch (SQLException e) {
				e.getMessage();
			}
		}
		return empList;
	}
