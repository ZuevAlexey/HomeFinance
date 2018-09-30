C:\nssm\nssm.exe remove HomeFinanceApi
C:\nssm\nssm.exe install HomeFinanceApi "C:\Program Files\nodejs\node.exe" "E:\HomeFinance\backendApi\server.js"
C:\nssm\nssm.exe set HomeFinanceApi DisplayName  "MyCompany HomeFinanceApi"
C:\nssm\nssm.exe set HomeFinanceApi Description "Web server for HomeFinance Synchronization"
