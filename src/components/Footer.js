import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';

export default function Footer() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.66)",
                    width: "60%",
                    justifyContent:"space-between",
                    marginTop:"50px",
                    height: "70px", 
                    borderRadius:"100px",
                    marginBottom:"20px"
                    
                  
                }}
            >
             
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        color: "#A0D3EF",
                        gap: "5px",
                        marginRight:"20px"
                    }}
                >
                    <h3 style={{ margin: 0 }}>   المهام الصغيرة تؤدي لنجاحات كبيرة</h3>
                    <MilitaryTechOutlinedIcon />
                </div>

                {/* الشعار - الجهة اليسرى */}
                <div
                    className="logo"
                    style={{
                        height: "50px", // تقليل ارتفاع الشعار
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img src="/images/myLogo.png" alt="logo" style={{ height: "100%" }} />
                </div>
            </div>
        </>
    );
}
