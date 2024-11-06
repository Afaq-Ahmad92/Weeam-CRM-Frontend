import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import { useLocation, useParams } from "react-router-dom";
import { getApi } from "services/api";
import { BiError } from "react-icons/bi";

const SingleInvoice = () => {
  const [state, setState] = useState({}); 
  const [isLoding, setIsLoding] = useState(true); 
  const [error404, set404] = useState(false); 
  const {id} = useParams(); 

  const downloadInvoice = () => {
    htmlToImage
      .toPng(document.getElementById("invoice-pdf"), { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-invoice.jpeg";
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, "PNG", 0, 0);
        pdf.save("download.pdf");
      });
  };


  const fetchData = async () => {
    setIsLoding(true);
    let result = await getApi("api/invoices/" + id
      , null, "server2"
    );
    if(result.status !== 404) {
      setState(result.data?.invoice || {});
    }

    if(result.status === 404) {
      set404(true); 
    }
    setIsLoding(false);
  };

  useEffect(() =>{
    fetchData(); 
  }, []); 

  if(error404) {
    return <Box height={400} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Text display={"flex"} alignItems={"center"} color={"red"} fontSize={24}><BiError size={25} style={{
        marginRight: 5, 
      }}/> No Invoice Found!</Text>
    </Box>
  }
  return (
    <Box bg="gray.50" p={8}>
      <Flex mb={4} justifyContent={"flex-end"}>
        <Button onClick={downloadInvoice} colorScheme="brand" size="sm">
          Download PDF
        </Button>
      </Flex>
      <Skeleton isLoaded={!isLoding}>
        <VStack id="invoice-pdf" bg="white" p={8} shadow="lg">
          <Box bg="#B79045" w="100%" textAlign="center" p={4} color="white">
            <Text fontSize="xl" fontWeight="bold">
              Tax Invoice
            </Text>
          </Box>
          <Flex justify="space-between" w="100%">
            <Box>
            <svg width="150" height="150" viewBox="0 0 511 405" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.5967 300.794H122.427V205.546L134.882 194.695V302H160.597L162 131L97.1145 189.069V278.69L25.5967 300.794Z" fill="#A07723"/>
<path d="M189.597 301H215.838V83.1828L224.187 73.5614L229.569 301H255.597V1L191.585 55.1204L189.597 301Z" fill="#A07723"/>
<path d="M285.643 129.933L279.597 3L319.597 18.2V143L285.643 129.933Z" fill="#A07723"/>
<path d="M321.597 222.143V163L277.597 195.991V301H306.15L306.661 231.396L321.597 222.143Z" fill="#A07723"/>
<path d="M20.5967 302H116.71V204.208L129.073 193.342V302H154.597V138L91.5848 190.122V279.866L20.5967 302Z" fill="#B79045"/>
<path d="M183.597 301H210.235V78.0488L224.362 65.5732V301H250.597V4L183.597 58.7317V301Z" fill="#B79045"/>
<path d="M279.597 128.472V4L313.597 18.9528V141L279.597 128.472Z" fill="#B79045"/>
<path d="M315.597 219.557V167L271.597 196.287V301H300.661V228.383L315.597 219.557Z" fill="#B79045"/>
<path d="M128.597 302V160.5L158.5 134L155.726 302H128.597Z" fill="#B79045"/>
<path d="M224.5 119.5L250.597 87.8408V4L183.597 58.6788V149L210.639 127.128V80.9553L223.958 67.9944L224.5 119.5Z" fill="#B79045"/>
<path d="M255.597 0L250.597 4.5V88L255.597 82.8723V0Z" fill="#A07723"/>
<path d="M128.597 193V200.294L122.39 205.156V302H116.597V203.535L128.597 193Z" fill="#A07723"/>
<path d="M224.597 68V74.5039L216.39 82.8661L215.5 123L210 127.5L210.597 81.0079L224.597 68Z" fill="#A07723"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M345.597 167V302H483.597L413.585 272.582V213.746L345.597 167ZM368 208.5L390 223.5V275.5H368V208.5Z" fill="#B79045"/>
<path d="M345.5 163.5V168L413.5 214.5V273L483.5 302H489.5L419 269V212.5L345.5 163.5Z" fill="#A07723"/>
<path d="M369.591 274.993V209.5L367.5 208V276L390.5 275.496L369.591 274.993Z" fill="#A07723"/>
<path d="M484.335 361.114V328.446H497.224C499.691 328.446 501.797 328.888 503.541 329.77C505.295 330.642 506.63 331.881 507.544 333.487C508.469 335.082 508.932 336.959 508.932 339.118C508.932 341.287 508.464 343.153 507.528 344.717C506.593 346.269 505.237 347.46 503.461 348.29C501.696 349.119 499.558 349.534 497.048 349.534H488.419V343.983H495.932C497.251 343.983 498.346 343.802 499.218 343.44C500.09 343.079 500.738 342.537 501.164 341.813C501.6 341.09 501.818 340.192 501.818 339.118C501.818 338.033 501.6 337.118 501.164 336.374C500.738 335.63 500.084 335.066 499.202 334.683C498.33 334.29 497.229 334.093 495.9 334.093H491.242V361.114H484.335ZM501.977 346.248L510.096 361.114H502.472L494.528 346.248H501.977Z" fill="#464646"/>
<path d="M443.788 361.114H436.387L447.664 328.446H456.565L467.827 361.114H460.425L452.242 335.912H451.987L443.788 361.114ZM443.326 348.274H460.808V353.665H443.326V348.274Z" fill="#464646"/>
<path d="M414.08 339.006C413.856 338.23 413.543 337.544 413.138 336.949C412.734 336.342 412.24 335.832 411.655 335.417C411.081 334.992 410.421 334.668 409.677 334.444C408.943 334.221 408.13 334.109 407.237 334.109C405.567 334.109 404.1 334.524 402.834 335.353C401.579 336.183 400.601 337.39 399.899 338.974C399.197 340.548 398.846 342.473 398.846 344.749C398.846 347.024 399.192 348.96 399.883 350.555C400.574 352.15 401.553 353.368 402.818 354.208C404.084 355.037 405.578 355.452 407.3 355.452C408.864 355.452 410.198 355.175 411.304 354.622C412.421 354.059 413.271 353.267 413.856 352.246C414.452 351.225 414.75 350.018 414.75 348.625L416.153 348.832H407.731V343.632H421.401V347.747C421.401 350.619 420.795 353.086 419.583 355.149C418.37 357.201 416.701 358.786 414.574 359.902C412.447 361.008 410.012 361.561 407.268 361.561C404.206 361.561 401.515 360.886 399.197 359.535C396.879 358.174 395.071 356.244 393.774 353.745C392.487 351.235 391.844 348.258 391.844 344.812C391.844 342.165 392.227 339.804 392.992 337.73C393.769 335.646 394.853 333.881 396.246 332.434C397.639 330.988 399.261 329.888 401.111 329.133C402.962 328.378 404.966 328 407.125 328C408.975 328 410.698 328.271 412.293 328.814C413.888 329.345 415.303 330.1 416.536 331.079C417.78 332.057 418.796 333.221 419.583 334.572C420.37 335.912 420.875 337.39 421.098 339.006H414.08Z" fill="#464646"/>
<path d="M353.406 361.114H346.005L357.282 328.446H366.183L377.444 361.114H370.043L361.86 335.912H361.605L353.406 361.114ZM352.943 348.274H370.426V353.665H352.943V348.274Z" fill="#464646"/>
<path d="M329.492 328.446V361.114H323.526L309.314 340.553H309.074V361.114H302.167V328.446H308.229L322.33 348.991H322.617V328.446H329.492Z" fill="#464646"/>
<path d="M264.104 361.114V328.446H271.011V355.42H285.016V361.114H264.104Z" fill="#464646"/>
<path d="M224.024 361.114V328.446H246.036V334.141H230.931V341.925H244.904V347.62H230.931V355.42H246.1V361.114H224.024Z" fill="#464646"/>
<path d="M147.371 328.446H155.889L164.885 350.395H165.268L174.265 328.446H182.783V361.114H176.083V339.851H175.812L167.358 360.955H162.796L154.342 339.772H154.071V361.114H147.371V328.446Z" fill="#464646"/>
<path d="M106.824 361.114H99.4226L110.7 328.446H119.601L130.862 361.114H123.461L115.278 335.912H115.023L106.824 361.114ZM106.361 348.274H123.844V353.665H106.361V348.274Z" fill="#464646"/>
<path d="M61.1123 361.114V328.446H83.1248V334.141H68.0191V341.925H81.9923V347.62H68.0191V355.42H83.1886V361.114H61.1123Z" fill="#464646"/>
<path d="M9.34734 361.114L0 328.446H7.54487L12.9523 351.145H13.2235L19.1892 328.446H25.6494L31.5991 351.193H31.8862L37.2937 328.446H44.8385L35.4912 361.114H28.7598L22.5389 339.756H22.2837L16.0787 361.114H9.34734Z" fill="#464646"/>
<path d="M385.147 387.785H387.925L393.48 395.409H393.715L399.271 387.785H402.048L394.81 397.387V404.119H392.385V397.387L385.147 387.785Z" fill="#B79045"/>
<path d="M382.948 392.889H380.522C380.378 392.32 380.127 391.82 379.769 391.389C379.417 390.959 378.986 390.597 378.478 390.305C377.976 390.007 377.418 389.784 376.805 389.635C376.192 389.486 375.553 389.411 374.888 389.411C373.675 389.411 372.577 389.661 371.592 390.161C370.614 390.661 369.835 391.397 369.254 392.37C368.68 393.343 368.394 394.537 368.394 395.951C368.394 397.366 368.68 398.559 369.254 399.532C369.835 400.505 370.614 401.242 371.592 401.742C372.577 402.241 373.675 402.491 374.888 402.491C375.553 402.491 376.192 402.417 376.805 402.268C377.418 402.119 377.976 401.898 378.478 401.606C378.986 401.308 379.417 400.944 379.769 400.513C380.127 400.077 380.378 399.578 380.522 399.014H382.948C382.765 399.849 382.432 400.596 381.95 401.255C381.467 401.914 380.867 402.475 380.15 402.938C379.433 403.395 378.628 403.743 377.734 403.983C376.847 404.222 375.899 404.342 374.888 404.342C373.18 404.342 371.66 404.001 370.33 403.321C369 402.64 367.953 401.672 367.19 400.418C366.428 399.163 366.046 397.674 366.046 395.951C366.046 394.229 366.428 392.74 367.19 391.485C367.953 390.23 369 389.263 370.33 388.582C371.66 387.901 373.18 387.561 374.888 387.561C375.899 387.561 376.847 387.681 377.734 387.92C378.628 388.159 379.433 388.51 380.15 388.973C380.867 389.43 381.467 389.988 381.95 390.648C382.432 391.302 382.765 392.049 382.948 392.889Z" fill="#B79045"/>
<path d="M361.975 387.785V404.119H359.627L348.712 391.294H348.516V404.119H346.091V387.785H348.438L359.393 400.641H359.588V387.785H361.975Z" fill="#B79045"/>
<path d="M329.629 404.119V387.785H341.718V389.539H332.055V395.058H341.092V396.813H332.055V402.364H341.875V404.119H329.629Z" fill="#B79045"/>
<path d="M322.854 392.889C322.639 392.352 322.355 391.871 322.003 391.445C321.657 391.015 321.243 390.648 320.761 390.345C320.285 390.041 319.744 389.81 319.137 389.651C318.531 389.491 317.866 389.411 317.142 389.411C315.955 389.411 314.876 389.661 313.904 390.161C312.933 390.661 312.16 391.397 311.586 392.37C311.012 393.343 310.726 394.537 310.726 395.951C310.726 397.366 311.016 398.559 311.596 399.532C312.176 400.505 312.962 401.242 313.953 401.742C314.944 402.241 316.059 402.491 317.298 402.491C318.446 402.491 319.457 402.292 320.33 401.893C321.211 401.489 321.895 400.92 322.384 400.186C322.88 399.447 323.128 398.578 323.128 397.578L323.871 397.706H317.846V395.951H325.475V397.706C325.475 399.051 325.123 400.221 324.419 401.215C323.721 402.21 322.756 402.98 321.524 403.528C320.298 404.07 318.889 404.342 317.298 404.342C315.525 404.342 313.966 404.001 312.623 403.321C311.286 402.64 310.243 401.672 309.493 400.418C308.75 399.163 308.378 397.674 308.378 395.951C308.378 394.659 308.59 393.498 309.014 392.466C309.444 391.429 310.051 390.547 310.833 389.818C311.616 389.09 312.542 388.531 313.611 388.143C314.68 387.755 315.857 387.561 317.142 387.561C318.198 387.561 319.183 387.691 320.096 387.952C321.015 388.207 321.833 388.571 322.551 389.045C323.274 389.512 323.878 390.073 324.36 390.727C324.843 391.376 325.175 392.097 325.358 392.889H322.854Z" fill="#B79045"/>
<path d="M292.311 404.119H289.768L297.123 387.785H299.627L306.982 404.119H304.439L298.453 390.369H298.297L292.311 404.119ZM293.25 397.738H303.5V399.493H293.25V397.738Z" fill="#B79045"/>
<path d="M267.281 404.119V387.785H279.37V389.539H269.706V395.058H278.744V396.813H269.706V402.364H279.526V404.119H267.281Z" fill="#B79045"/>
<path d="M248.514 389.539V387.785H263.538V389.539H257.239V404.119H254.813V389.539H248.514Z" fill="#B79045"/>
<path d="M234.159 404.119H231.616L238.972 387.785H241.476L248.831 404.119H246.288L240.302 390.369H240.145L234.159 404.119ZM235.098 397.738H245.349V399.493H235.098V397.738Z" fill="#B79045"/>
<path d="M216.91 389.539V387.785H231.934V389.539H225.635V404.119H223.209V389.539H216.91Z" fill="#B79045"/>
<path d="M211.395 391.868C211.278 391.06 210.802 390.432 209.967 389.986C209.133 389.539 208.109 389.316 206.896 389.316C206.009 389.316 205.233 389.433 204.568 389.667C203.91 389.901 203.394 390.222 203.023 390.632C202.658 391.041 202.475 391.506 202.475 392.027C202.475 392.463 202.602 392.838 202.856 393.152C203.117 393.46 203.45 393.718 203.854 393.926C204.258 394.128 204.682 394.295 205.126 394.428C205.569 394.556 205.977 394.659 206.348 394.739L208.383 395.186C208.904 395.297 209.485 395.452 210.124 395.648C210.769 395.845 211.385 396.114 211.972 396.454C212.566 396.789 213.055 397.219 213.439 397.746C213.824 398.272 214.016 398.918 214.016 399.684C214.016 400.567 213.733 401.364 213.165 402.077C212.605 402.789 211.783 403.355 210.701 403.775C209.625 404.195 208.317 404.405 206.779 404.405C205.344 404.405 204.102 404.217 203.052 403.839C202.009 403.462 201.187 402.935 200.587 402.26C199.994 401.585 199.658 400.801 199.58 399.907H202.084C202.149 400.524 202.403 401.034 202.847 401.439C203.297 401.837 203.864 402.135 204.549 402.332C205.24 402.523 205.983 402.619 206.779 402.619C207.704 402.619 208.536 402.497 209.273 402.252C210.01 402.002 210.593 401.657 211.023 401.215C211.454 400.769 211.669 400.248 211.669 399.652C211.669 399.11 211.483 398.668 211.112 398.328C210.74 397.988 210.251 397.711 209.644 397.499C209.038 397.286 208.383 397.1 207.678 396.94L205.214 396.366C203.649 395.999 202.41 395.475 201.497 394.795C200.584 394.114 200.128 393.224 200.128 392.123C200.128 391.209 200.431 390.411 201.037 389.73C201.65 389.045 202.472 388.513 203.502 388.135C204.539 387.753 205.696 387.561 206.974 387.561C208.265 387.561 209.413 387.75 210.417 388.127C211.421 388.5 212.217 389.01 212.804 389.659C213.397 390.307 213.71 391.044 213.743 391.868H211.395Z" fill="#B79045"/>
<path d="M183.98 404.119V387.785H196.069V389.539H186.406V395.058H195.443V396.813H186.406V402.364H196.226V404.119H183.98Z" fill="#B79045"/>
<path d="M160.74 404.119V387.785H163.166V402.364H172.477V404.119H160.74Z" fill="#B79045"/>
<path d="M142.949 404.119H140.406L147.761 387.785H150.265L157.62 404.119H155.077L149.091 390.369H148.935L142.949 404.119ZM143.888 397.738H154.138V399.493H143.888V397.738Z" fill="#B79045"/>
<path d="M125.666 404.119V387.785H137.755V389.539H128.091V395.058H137.129V396.813H128.091V402.364H137.911V404.119H125.666Z" fill="#B79045"/>
<path d="M108.048 404.118V387.785H114.817C116.382 387.785 117.666 388.003 118.67 388.439C119.675 388.869 120.418 389.462 120.9 390.217C121.383 390.972 121.624 391.831 121.624 392.793C121.624 393.756 121.383 394.609 120.9 395.353C120.418 396.098 119.678 396.683 118.68 397.108C117.683 397.528 116.408 397.738 114.856 397.738H109.379V395.952H114.778C115.847 395.952 116.708 395.824 117.36 395.569C118.018 395.313 118.494 394.952 118.788 394.484C119.088 394.011 119.238 393.447 119.238 392.793C119.238 392.139 119.088 391.568 118.788 391.078C118.488 390.589 118.009 390.212 117.35 389.946C116.691 389.675 115.821 389.539 114.738 389.539H110.474V404.118H108.048ZM117.477 396.781L122.407 404.118H119.59L114.738 396.781H117.477Z" fill="#B79045"/>
</svg>

              <Text fontSize="lg" fontWeight="bold" mb={2}>
                WEAM ELNAGGAR REAL ESTATE
              </Text>
              <Text>
                Office #3102, API World Tower, Sheikh Zayed road, Dubai, UAE
              </Text>
              <Text>Telephone: +971-58-557-7271 | +971-56-115-0747</Text>
              <Text>TRN: 104271009300003</Text>
            </Box>
            <Box textAlign="right">
              <Text fontWeight="bold">Invoice Date:</Text>
              <Text>{new Date(state?.created_at)?.toDateString()}</Text>
              <Text fontWeight="bold" mt={2}>
                Tax Invoice No:
              </Text>
              <Text>{state?.invoice_number}</Text>
            </Box>
          </Flex>
          <Box border={"1px solid #eee"} my={"20px"} w="100%" p={4} color="black">
            <Text fontWeight="bold">Invoiced To</Text>
            <Text>{state?.developer?.developer_name || "-"}</Text>
            <Text>{state?.developer?.address || "-"}</Text>
            <Text>TRN: {state?.developer?.trn || "-"}</Text>
          </Box>
          <Table style={{
            marginTop: 20
          }} variant="simple" size="sm">
            <Thead color={"white"} bg={"#B79045"}>
              <Tr>
                <Th color={"white"}>SN</Th>
                <Th color={"white"}>Unit No</Th>
                <Th color={"white"}>Name of Referring Party</Th>
                <Th color={"white"}>Claim Type</Th>
                <Th color={"white"}>Commission %</Th>
                <Th color={"white"}>Unit Price</Th>
                <Th color={"white"}>Total Commission EXCL. vat</Th>
                <Th color={"white"}>Vat %</Th>
                <Th color={"white"}>Vat Amount</Th>
                <Th color={"white"}>Total Commission include vat</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <Tr key={i}>
                  <Td textAlign="center">{i + 1}</Td>
                  <Td>AZIZI VENICE 08B-736</Td>
                  <Td>WEAM ELNAGGAR REAL ESTATE</Td>
                  <Td textAlign="center">FULL</Td>
                  <Td textAlign="center">7%</Td>
                  <Td textAlign="right">647000.00</Td>
                  <Td textAlign="right">45290.00</Td>
                  <Td textAlign="center">5%</Td>
                  <Td textAlign="right">2264.20</Td>
                  <Td textAlign="right">47554.50</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justify="space-between" w="100%" bg={"#B79045"} color={"white"} padding={2} mb={4}>
            <Text fontWeight="bold">Total Commission :</Text>
            <Text>
              Two Hundred Twenty One Thousand Seven Hundred Seventy-Seven and
              Sixty fils.
            </Text>
          </Flex>
          <Box border={"1px solid #eee"} w="100%" p={4} color="black">
            <Text fontWeight="bold">Bank Account Details:</Text>
            <Text>Account Name : {state?.bank_account?.account_holder_name || "-"}</Text>
            <Text>Account Number : {state?.bank_account?.account_number||"-"}</Text>
            <Text>IBAN : {state?.bank_account?.iban||"-"}</Text>
            <Text>Swift Code : {state?.bank_account?.swift_code||"-"}</Text>
            <Text>Bank : {state?.bank_account?.bank_name || "-"}</Text>
            <Text>Bank Address : {state?.bank_account?.branch_address||"-"}</Text>
          </Box>
          <Box
            textAlign="right"
            w="100%"
            p={4}
            borderTop="1px"
            borderColor="gray.200"
          >
            <Text mb={2}>
              <Text as="span" fontWeight="bold">
                Total Commission EXCL. VAT:
              </Text>{" "}
              219,777.60 AED
            </Text>
            <Text mb={2}>
              <Text as="span" fontWeight="bold">
                VAT Amount:
              </Text>{" "}
              21345.60 AED
            </Text>
            <Text fontWeight="bold">
              <Text as="span" fontWeight="bold">
                Total Commission Include VAT:
              </Text>{" "}
              899,777.60 AED
            </Text>
          </Box>
        </VStack>
      </Skeleton>
    </Box>
  );
};

export default SingleInvoice;