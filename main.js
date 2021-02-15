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
		icon:process.execPath.split("node_modules")[0].replace("\\","/")+"resources/logo.ico",
        webPreferences: {
            nodeIntegration: true
        }
	});
	win.setMenu(null);
	win.loadURL("file:///./resources/ui.html");
});