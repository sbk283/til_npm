import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";

function Line() {
  const [data, setData] = useState([]);

  // JSON 파일에서 fetch
  const fetchDataFromJson = async () => {
    try {
      const res = await fetch("/line_data.json");
      const json = await res.json();
      setData(json);
      console.log("📂 외부 JSON 데이터 로드됨");
    } catch (error) {
      console.error("🚨 fetch 에러:", error);
    }
  };

  // localStorage 저장 함수
  const saveData = () => {
    const tempData = [
      {
        id: "감정기록",
        data: [
          { x: "좋음", y: 5 },
          { x: "치킨", y: 78 },
          { x: "boat", y: 276 },
          { x: "train", y: 55 },
          { x: "subway", y: 144 },
          { x: "bus", y: 216 },
          { x: "car", y: 253 },
          { x: "moto", y: 102 },
          { x: "bicycle", y: 156 },
          { x: "horse", y: 131 },
          { x: "skateboard", y: 147 },
          { x: "others", y: 232 },
        ],
      },
    ];
    localStorage.setItem("line_data", JSON.stringify(tempData));
    alert("✅ 로컬스토리지에 저장 완료!");
  };

  // 로컬스토리지 또는 JSON 데이터 불러오기
  useEffect(() => {
    const localData = localStorage.getItem("line_data");
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setData(parsed);
        console.log("📦 로컬 데이터 불러옴");
      } catch (e) {
        console.error("JSON 파싱 에러:", e);
      }
    } else {
      fetchDataFromJson(); // 로컬에 없으면 json에서 불러오기
    }
  }, []);

  return (
    <div>
      <h1>📈 Line 차트 예제</h1>
      <button onClick={saveData}>📥 localStorage에 저장하기</button>
      <div style={{ width: "100%", height: 600 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          axisBottom={{ legend: "감정", legendOffset: 36 }}
          axisLeft={{ legend: "수치", legendOffset: -40 }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "seriesColor" }}
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 100,
              itemWidth: 80,
              itemHeight: 22,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Line;
