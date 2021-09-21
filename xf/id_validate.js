function validate() {
	var idCard = document.getElementById("chineze_citizen_id").value;
	var regIdCard=/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	if(regIdCard.test(idCard)) {
		if(idCard.length==18) {
			var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
			var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
			var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
			for(var i=0; i<17; i++) {
				idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
			}
			var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
			var idCardLast=idCard.substring(17);//得到最后一位身份证号码
			//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
			if(idCardMod==2) {
				if(idCardLast=="X"||idCardLast=="x") {
				//  console.log("idCard:valid");
				// 	document.getElementById("tips").innerHTML="<font color='green'>身份证合法</font>";
				    document.getElementById("id_validate_error").className="inputValidationError js-validationError";
					document.getElementById("js-signUpButton").disabled = false;
				} else {
				//  console.log("idCard:invalid(last char)");
				// 	document.getElementById("tips").innerHTML="<font color='red'>身份证非法</font>";
				    document.getElementById("id_validate_error").className="inputValidationError js-validationError is-active";
				    document.getElementById("id_validate_error").innerHTML="您输入的身份证非法";
					document.getElementById("js-signUpButton").disabled = true;
				}
			} else {
				//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
				if(idCardLast==idCardY[idCardMod]) {
				//  console.log("idCard:valid");
				// 	document.getElementById("tips").innerHTML="<font color='green'>身份证合法</font>";
				    document.getElementById("id_validate_error").className="inputValidationError js-validationError";
					document.getElementById("js-signUpButton").disabled = true;
				} else {
				//  console.log("idCard:invalid(last num)");
				//  document.getElementById("tips").innerHTML="<font color='red'>身份证非法</font>";
				    document.getElementById("id_validate_error").className="inputValidationError js-validationError is-active";
				    document.getElementById("id_validate_error").innerHTML="您输入的身份证非法";
					document.getElementById("js-signUpButton").disabled = false;
				}
			}
		}
	} else {
	 // console.log("idCard:invalid(unknown)");
 	 // document.getElementById("tips").innerHTML="<font color='green'>身份证格式非法</font>";
		document.getElementById("id_validate_error").className="inputValidationError js-validationError is-active";
		document.getElementById("id_validate_error").innerHTML="您输入的身份证非法";
		document.getElementById("js-signUpButton").disabled = true;
		
	}
}