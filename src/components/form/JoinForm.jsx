import { Button, Form, Input } from "antd";

function JoinForm() {
  // js 자리
  // 1. 초기값
  const initialValues = {
    id: "hong",
    pass: "Qwer1234",
    name: "길동",
    email: "a@a.net",
  };
  // 2. 라벨넣기
  // 3. placeholder 넣기
  // 4. 필수값 표현하기
  // 5. 필수값 안내 매시지 표시하기
  // 6. 각 필드의 입력중인 값 알아내기
  const onFieldsChange = (field, allFields) => {
    // console.log("Changed field:", field[0].value);
    // console.log("All fields:", allFields);
  };
  // 7. 확인 버튼 선택시 최종 입력값
  const onFinish = value => {
    console.log(value);
  };

  // jsx 자리
  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValues}
        onFieldsChange={(field, allFields) => onFieldsChange(field, allFields)}
        onFinish={values => onFinish(values)}
      >
        <Form.Item
          label="아이디"
          name={"id"}
          required={true}
          rules={[
            { required: true, message: "아이디를 입력하세요" },
            { min: 4, message: "아이디는 최소 4글자 이상이어야 합니다" },
            { max: 12, message: "아이디는 최대 12글자 이하이어야 합니다" },
          ]}
        >
          <Input placeholder="아이디를 입력하세요" />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name={"pass"}
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자이상이며, 대소문자, 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>
        <Form.Item label="닉네임" name={"name"}>
          <Input placeholder="닉네임을 입력하세요" />
        </Form.Item>
        <Form.Item
          label="이메일"
          required={true}
          name={"email"}
          rules={[
            { required: true, message: "이메일은 필수요소 입니다" },
            { type: "email", message: "유효한 이메일 주소를 입력하세요" },
          ]}
        >
          <Input placeholder="이메일을 입력하세요" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default JoinForm;
