import { dataSet } from "../../data/data";
import KmeansAlgorithme from "./../../algorithmes/k-means";
import {
  Table,
  Row,
  Col,
  Button,
  Space,
  InputNumber,
  Input,
  Form,
  Typography,
  Popconfirm,
  message,
} from "antd";
import { useState } from "react";
const { Text } = Typography;
export interface IRow {
  x: number;
  y: number;
  key: number;
}

const Index = () => {
  const array: IRow[] = [];
  const arraytoDeleting: IRow[] = [];
  const [form] = Form.useForm();
  const [data, setData] = useState<IRow[]>([...dataSet]);
  const [editingKey, setEditingKey] = useState("");
  const [count, setCount] = useState<number>(data.length);
  const [numberClasses, setNumberClasses] = useState("5");
  const [resultValue, setResultValue] = useState("");
  const [paginationNumber, setPaginationNumber] = useState(1);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log("select row keys " + JSON.stringify(selectedRowKeys));
      if (selectedRows.length === 1) {
        while (array.length) {
          array.pop();
        }
      } else {
        console.log("over one line");
      }

      array.push(selectedRows);

      while (arraytoDeleting.length) {
        arraytoDeleting.pop();
      }

      arraytoDeleting.push(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: IRow;
    index: number;
    children: React.ReactNode;
  }
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <InputNumber />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const EditableTable = () => {
    const isEditing = (record: IRow) => record.key.toString() === editingKey;

    const edit = (record: Partial<IRow> & { key: React.Key }) => {
      form.setFieldsValue({ x: "", y: "", ...record });
      setEditingKey(record.key.toString());
    };

    const cancel = () => {
      setEditingKey("");
    };

    const save = async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as IRow;

        const newData = [...(data as IRow[])];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey("");
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey("");
        }
      } catch (errInfo) {
        console.log("Validate Failed:", errInfo);
      }
    };

    const columns = [
      {
        title: "X",
        dataIndex: "x",
        // width: "25%",
        editable: true,
      },
      {
        title: "Y",
        dataIndex: "y",
        // width: "15%",
        editable: true,
      },

      {
        title: "operation",
        dataIndex: "operation",
        render: (_: any, record: IRow) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{ marginRight: 8 }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          );
        },
      },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: IRow) => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowSelection={{
            type: "checkbox",
            onChange: rowSelection.onChange,
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            defaultCurrent: paginationNumber,
          }}
        />
      </Form>
    );
  };
  const handleAdd = () => {
    const newData: IRow = {
      key: data.length + 1,
      x: 0,
      y: 0,
    };
    setData([...data, newData]);
    setCount(count + 1);
    setPaginationNumber(Infinity);
  };
  const handleDelete = () => {
    const d: any = arraytoDeleting[0];
    if (d.length > 0) {
      console.log(data);

      const res = data.filter((item) => !d.includes(item));
      setData([...res]);
    } else {
      message.warning("Merci de selectionner un element");
    }
  };
  const handleChangeInput = (e: string) => {
    setNumberClasses(e);
  };
  const handleTraiter = () => {
    let dataSet = data.map(({ ...elem }) => ({ ...elem }));
    const result = KmeansAlgorithme(+numberClasses, dataSet);
    let resultContent = "";
    result.map((iterationClasses: any, index: number) => {
      resultContent += `============= Iteration ${index + 1}: ==============\n`;
      iterationClasses.map((classItem: any) => {
        resultContent += classItem.name + ":";
        let elementsCount = classItem.elements.length;
        for (let i = 0; i < elementsCount; i++) {
          resultContent += `A${classItem.elements[i].key}${
            i == elementsCount - 1 ? ";\n" : ":"
          }`;
        }
      });
      // resultContent += "\n=======================\n\n";
    });
    setResultValue(resultContent);
    console.log(resultContent);
  };
  return (
    <>
      <div className="main-container">
        <Row gutter={24}>
          <Col span={12} style={{ marginBottom: "20px" }}>
            <Space>
              <Button type={"primary"} onClick={handleAdd}>
                Ajouter
              </Button>

              <Button type={"primary"} onClick={handleDelete}>
                Supprimer
              </Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <EditableTable />
          </Col>
          <Col span={12}>
            <div className="rightPanel">
              <div className="input-holder">
                <div>
                  <Text style={{ color: "white" }} className="text">
                    Entre nombre de classes :
                  </Text>
                  <InputNumber
                    defaultValue={numberClasses}
                    min={"1"}
                    max={"100"}
                    onChange={handleChangeInput}
                  />
                </div>
                <div>
                  <Button
                    type={"primary"}
                    className="large_button"
                    onClick={handleTraiter}
                  >
                    Traiter
                  </Button>
                </div>
              </div>
              <div className="result">
                <Input.TextArea
                  style={{ height: "527px" }}
                  value={resultValue}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Index;
