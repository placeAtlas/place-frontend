import Card from "./card";
import styles from "../styles/everything.module.css";

export default function Pixels({
  pixels,
  image = true,
  uid = false,
  loading = false,
}) {
  /*
  Example pixels:
  {
   "count" : 18,
   "pixels" : [
      {
         "createdAt" : null,
         "id" : 10737584,
         "pixel_color" : "#000000",
         "timestamp" : "2022-04-01T16:13:59.866Z",
         "updatedAt" : null,
         "user_id" : "qquPzVansWsmGZcq46mfvtSilJh9/UoOcpbE/Q9cTsTUoc0R833I9Kx6ZwpfJBYh1rN6u/gui+K0pAkQvT5f7A==",
         "x" : 24,
         "x2" : null,
         "y" : 942,
         "y2" : null
      },
      ...
   ],
   "status" : "ok"
}
  */

  // The current pixel being displayed
  // const [current, setCurrent] = useState(0);
  if (pixels && pixels.count !== 0 && !loading) {
    // 220px because that is 200px + 10px*2 padding
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pixels.pixels.map((px) => (
          <Card key={px.timestamp} style={{ maxWidth: "300px" }}>
            {image ? (
              <div
                style={{
                  height: "300px",
                  width: "300px",
                  backgroundImage: 'url("final_place_3x.png")',
                  backgroundPosition: `${
                    px.x * -3 + 100 <= 0
                      ? px.x * -3 - 100 >= -3 * 2000
                        ? px.x * -3 + 100
                        : -3 * 2000
                      : 0
                  }px ${
                    px.y * -3 + 100 <= 0
                      ? px.y * -3 - 100 >= -3 * 2000
                        ? px.y * -3 + 100
                        : -3 * 2000
                      : 0
                  }px`,
                  borderRadius: "5% 5% 0% 0%",
                }}
              />
            ) : (
              ""
            )}
            <div style={{ padding: "5px 20px", inlineSize: "290px" }}>
              <p>Coordinates: {`(${px.x}, ${px.y})`}</p>
              <div style={{ padding: "0" }}>
                <p
                  style={{
                    verticalAlign: "middle",
                    display: "inline-block",
                    lineHeight: "1em",
                    margin: "0",
                  }}
                >
                  Color: {px.pixel_color}
                </p>
                <div
                  style={{
                    verticalAlign: "middle",
                    display: "inline-block",
                    marginLeft: "5px",
                    height: "1em",
                    width: "1em",
                    background: px.pixel_color,
                  }}
                />
              </div>
              {uid ? (
                <p style={{ wordWrap: "break-word" }}>User id: {px.user_id}</p>
              ) : (
                ""
              )}
              <p>Time placed: {new Date(px.timestamp).toUTCString()}</p>
            </div>
          </Card>
        ))}
      </div>
    );
  } else if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <div className={styles["lds-ring"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (pixels && pixels.count === 0) {
    return (
      <p className={`${styles.error} ${styles.active}`}>No results found</p>
    );
  }
}
