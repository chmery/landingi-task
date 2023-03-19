import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Legend,
    Tooltip,
    CategoryScale,
    ChartOptions,
} from "chart.js";
import { ProductData } from "../../../types/Carts";

type Props = {
    productsData: ProductData[];
};

const Chart = ({ productsData }: Props) => {
    ChartJS.register(LinearScale, PointElement, LineElement, Legend, Tooltip, CategoryScale);

    const options: ChartOptions<"line"> = {
        plugins: {
            legend: {
                position: "bottom",
                align: "start",
            },
            tooltip: {
                callbacks: {
                    title: (context) => context[0].label.replaceAll(",", " "),
                },
            },
        },
    };

    const data = {
        labels: productsData.map((product) => product.title.split(" ")),
        datasets: [
            {
                label: "Price",
                data: productsData.map((product) => product.total),
                backgroundColor: "#5076ff",
                borderColor: "#5076ff",
            },
            {
                label: "Discounted price",
                data: productsData.map((product) => product.discountedPrice),
                backgroundColor: "#2CE88E",
                borderColor: "#2CE88E",
            },
        ],
    };

    return (
        <div style={{ width: "35rem" }} data-testid="chart">
            <Line data={data} options={options} />
        </div>
    );
};

export default Chart;
