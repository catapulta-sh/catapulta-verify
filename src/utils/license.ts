export const getLicenseType = (license: String): undefined | number => {
    switch (license) {
        case 'None':
            return 1;
        case 'UNLICENSED':
            return 2;
        case 'MIT':
            return 3;
        case 'GPL-2.0':
            return 4;
        case 'GPL-3.0':
            return 5;
        case 'LGPL-2.1':
            return 6;
        case 'LGPL-3.0':
            return 7;
        case 'BSD-2-Clause':
            return 8;
        case 'BSD-3-Clause':
            return 9;
        case 'MPL-2.0':
            return 10;
        case 'OSL-3.0':
            return 11;
        case 'Apache-2.0':
            return 12;
        case 'AGPL-3.0':
            return 13;
        case 'BUSL-1.1':
            return 14;
        default:
            console.error(
                `The provided license: ${license} is not supported by Etherscan. List of supported licenses can be found here: https://etherscan.io/contract-license-types`
            );
            process.exit(4);
    }
};


export const extractOneLicenseFromSourceFile = (source: string): number | undefined => {
    const regex = /\/\/\s*\t*SPDX-License-Identifier:\s*\t*(.*?)[\s\\]/g;
    const match = [...source.matchAll(regex)];
    if (!match) {
        console.log(`Please provide a license in the source contract.`);
        return;
    }

    return getLicenseType(match[0][1]);
};