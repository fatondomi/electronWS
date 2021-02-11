const electron=require("electron");
const {app, BrowserWindow}=electron;

//per mi hjek security warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

app.on('ready',()=>{
	let win = new BrowserWindow(
	{
		height:800,
		width:1200,
		frame:true,
		resizable:true,
        webPreferences: {
            nodeIntegration: true
        }
	});
	win.setMenu(null);
	win.loadURL("file:///./resources/ui.html");
	win.webContents.openDevTools();
});