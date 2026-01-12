import WebDataRocks from "@webdatarocks/webdatarocks";
import "@webdatarocks/webdatarocks/webdatarocks.min.css";
import { isNull, keys } from "lodash-es";
import { countPerCountry } from "../../util/count-per-country.util.js";

let pivotInstance = null;
let usersCache = [];

export const renderWebdatarocksTable = (users) => {
    if (!users?.length) return;
    usersCache = users;

    pivotInstance = new WebDataRocks({
        container: "#pivot-container",
        toolbar: true,
        report: {
            dataSource: {
                data: users,
            },
            options: {
                grid: {
                    type: "flat",
                    showHeaders: true,
                },
            },
        },
    });
};

export const changeToReportByCountry = () => {
    const byCountryButton = document.getElementById("webdatarocks-by-country-button");
    if (isNull(byCountryButton)) return;

    byCountryButton.addEventListener("click", async () => {
        if (!usersCache?.length) return;

        const stats = await countPerCountry(usersCache);
        pivotInstance.setReport({
            dataSource: {
                data: stats.map(s => ({
                    "Country": s.country,
                    "Teachers count": s.count,
                })),
            },
            options: {
                grid: {
                    type: "flat",
                    showHeaders: true,
                },
            },
        });
    });
};

export const changeToFlatTable = () => {
    const flatTableButton = document.getElementById("webdatarocks-flat-button");
    if (isNull(flatTableButton)) return;

    flatTableButton.addEventListener("click", () => {
        if (!usersCache?.length) return;

        pivotInstance.setReport({
            dataSource: {
                data: usersCache,
            },
            options: {
                grid: {
                    type: "flat",
                    showHeaders: true,
                },
            },
        });
    });
};
