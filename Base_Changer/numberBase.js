var octarr=new Array();
var hexarr=new Array();
var acceptedarr=new Array();
octarr=["000","001","010","011","100","101","110","111"];
hexarr=["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
acceptedarr=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];

function bintoothers(binstr,basewanted)
{
	if(binstr=="error")
		return "error"

	for (var i = 0; i <binstr.length; i++) //checking for any str other than 0 and 1
	{
		if(!(binstr.charAt(i)=="0"||binstr.charAt(i)=="1"))
		return "error";
	}
	var result="";

	if(basewanted==2)
	{
		return binstr;
	}
	else if(basewanted==8)//octal 
	{
		if(binstr.length%3!=0)//adding extra zeror in front
		{
			if(binstr.length%3==1)
			{
				binstr="00"+binstr;
			}
			if(binstr.length%3==2)
			{
				binstr="0"+binstr;
			}
		}


		for (var i = binstr.length; i >=0; i=i-3) 
		{
			for (var j = 0; j <octarr.length; j++) 
			{
				if(binstr.substring(i,i+3)==octarr[j])
				{
					result+=j;
				}
			}
			
		}
		result=result.split("");
		result.reverse();
		result=result.join("");
	}


	else if(basewanted==10)//decimal 
	{
		number=0;
		len=binstr.length;
		for (var i = len; i >=0; i--) 
		{
			if(binstr.charAt(i)=="1")
			number=number+Math.pow(2,len-i-1)
		}
		result=number.toString();
	}


	else if(basewanted==16)//hexadecimal 
	{
		if(binstr.length%4!=0)//adding extra zeror in front
		{
			if(binstr.length%4==1)
			{
				binstr="000"+binstr;
			}
			if(binstr.length%4==2)
			{
				binstr="00"+binstr;
			}
			if(binstr.length%4==3)
			{
				binstr="0"+binstr;
			}
		}


		for (var i = binstr.length; i >=0; i=i-4) 
		{
			for (var j = 0; j < hexarr.length; j++) 
			{
				if(binstr.substring(i,i+4)==hexarr[j])
				{
					if(j>9)
					{
						result+=String.fromCharCode(55+j)
					}
					else
					result+=j;
				}
			}
			
		}
		result=result.split("");
		result.reverse();
		result=result.join("");
	}
	return result;
}
function makebin(inputno,itsbase)
{
	result="";
	inputno=inputno.toString();
	for (var i = 0; i <inputno.length; i++) 
	{	
		if(itsbase==2||itsbase==8||itsbase==10)
		{
			if(Number(inputno.charAt(i))>=itsbase||Number(inputno.charAt(i))<0||Number.isNaN((Number(inputno.charAt(i)))))
			return "error";
		}
		else if(itsbase==16)
		{
			if(!(acceptedarr.includes(inputno.charAt(i))))
			return "error";
		}
		
	}
	

	if(itsbase==2)
	{	
		inputno=inputno.toString();
		result=inputno;
	}
	else if(itsbase==8)
	{
		genstr="";
		for (var i = 0; i < inputno.length; i++) 
		{
			genstr+=octarr[Number(inputno[i])]
		}
		result=genstr;
	}

	else if(itsbase==10)
	{
		genstr="";
		while(inputno>0)
		{
			if(inputno==1)
			{
				genstr+=1;
				inputno=0;
			}
			else
			{
				d=Math.floor(inputno/2);
				no=inputno-(d*2);
				if(no==1)
					genstr+=no;
				else if(no==0)
					genstr+=no;
				inputno=d;
			}
			
		}
		genstr=genstr.split("");
		genstr.reverse();
		genstr=genstr.join("");
		result=genstr;

	}
	else if(itsbase==16)
	{
		genstr="";
		for (var i = 0; i < inputno.length; i++) 
		{
			if(Number(inputno[i])<=9)
				genstr+=hexarr[Number(inputno[i])]
			else
				genstr+=hexarr[inputno.charCodeAt(i)-55]
		}
		result=genstr;
	}
	

	result=result.split("");//removeing beginning zeroes starts
	result=result.reverse();
		for (var i = result.length-1; i >0 ; i--) 
		{
			if(result[i]==0)
				result.pop();
			else
				break;
		}
	result=result.reverse();
	result=result.join("");//removeing beginning zeroes ends


	return result;
}

function clearall()
{
	document.getElementById("outputtextinp").value="";
	document.getElementById("inputtext").value="";
	document.getElementById("outputcontp").innerHTML="";
	document.getElementsByClassName("outputcont")[0].style.background="#7a7979";
}
function convertbase()
{
	baseTo=document.getElementById("baseTo").value;
	baseFrom=document.getElementById("baseFrom").value;
	inputtext=document.getElementById("inputtext").value;
	ans=bintoothers(makebin(inputtext,baseFrom),baseTo);
	if(ans=="error")
	{
		document.getElementById("outputcontp").innerHTML="Error ! 👻";
		document.getElementsByClassName("outputcont")[0].style.background="#e74c3c";
		document.getElementById("outputtextinp").value="Error";
	}
	else
	{
		document.getElementsByClassName("outputcont")[0].style.background="#7a7979";
		document.getElementById("outputcontp").innerHTML="(<span id='outputtext'>"+ans+"</span>)<sub id='baseconans'>"+baseTo+"</sub>";
		document.getElementById("outputtextinp").value=ans;
	}
}
function copytext()
{
	copiedstr=document.getElementById("outputtextinp");
	copiedstr.select();
  	document.execCommand("copy");

}

