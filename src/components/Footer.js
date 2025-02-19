import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import '../styles/footer.css'

export default function Footer() {
  return (
    <>
      <div className="footer"
      >
        <div className="container" >
          <h3 style={{ margin: 0 }}> المهام الصغيرة تؤدي لنجاحات كبيرة</h3>
          <MilitaryTechOutlinedIcon style={{color:"#ffd60a"}} />
        </div>
        <div
          className="logo">
          <img src="/images/myLogo.png" alt="logo" style={{ height: "100%" }} />
        </div>
      </div>
    </>
  );
}
