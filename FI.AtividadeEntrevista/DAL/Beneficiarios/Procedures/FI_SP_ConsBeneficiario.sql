﻿CREATE PROC FI_SP_ConsBeneficiario
	@ID			BIGINT,
	@IDCLIENTE  BIGINT
AS
BEGIN
	SELECT *
	  FROM BENEFICIARIOS
	 WHERE (isNull(@ID, 0) = 0 or ID = @ID)
	   and (ISNULL(@IDCLIENTE, 0) = 0 or IDCLIENTE = @IDCLIENTE)
END