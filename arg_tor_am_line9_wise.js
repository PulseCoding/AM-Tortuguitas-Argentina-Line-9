var fs     = require('fs'),
    modbus = require('jsmodbus'),
    PubNub = require('pubnub'),
    secPubNub = 0
var CanPrintct = null,
    CanPrintresults = null,
    CntInCanPrint = null,
    CanPrintactual = 0,
    CanPrinttime = 0,
    CanPrintsec = 0,
    CanPrintflagStopped = false,
    CanPrintstate = 0,
    CanPrintspeed = 0,
    CanPrintspeedTemp = 0,
    CanPrintflagPrint = 0,
    CanPrintsecStop = 0,
    CanPrintONS = false,
    CanPrinttimeStop = 60, //NOTE: Timestop
    CanPrintWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    CanPrintflagRunning = false,
    Fillingct = null,
    Fillingresults = null,
    CntOutFilling = null,
    Fillingactual = 0,
    Fillingtime = 0,
    Fillingsec = 0,
    FillingflagStopped = false,
    Fillingstate = 0,
    Fillingspeed = 0,
    FillingspeedTemp = 0,
    FillingflagPrint = 0,
    FillingsecStop = 0,
    FillingONS = false,
    FillingtimeStop = 60, //NOTE: Timestop
    FillingWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    FillingflagRunning = false,
    ValvsMachinect = null,
    ValvsMachineresults = null,
    CntOutValvsMachine = null,
    ValvsMachineactual = 0,
    ValvsMachinetime = 0,
    ValvsMachinesec = 0,
    ValvsMachineflagStopped = false,
    ValvsMachinestate = 0,
    ValvsMachinespeed = 0,
    ValvsMachinespeedTemp = 0,
    ValvsMachineflagPrint = 0,
    ValvsMachinesecStop = 0,
    ValvsMachineONS = false,
    ValvsMachinetimeStop = 60, //NOTE: Timestop
    ValvsMachineWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    ValvsMachineStatus = null,
    ValvsMachineflagRunning = false,
    Crimperct = null,
    Crimperresults = null,
    CntOutCrimper = null,
    Crimperactual = 0,
    Crimpertime = 0,
    Crimpersec = 0,
    CrimperflagStopped = false,
    Crimperstate = 0,
    Crimperspeed = 0,
    CrimperspeedTemp = 0,
    CrimperflagPrint = 0,
    CrimpersecStop = 0,
    CrimperONS = false,
    CrimpertimeStop = 60, //NOTE: Timestop
    CrimperWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    CrimperflagRunning = false,
    Gassingct = null,
    Gassingresults = null,
    CntOutGassing = null,
    Gassingactual = 0,
    Gassingtime = 0,
    Gassingsec = 0,
    GassingflagStopped = false,
    Gassingstate = 0,
    Gassingspeed = 0,
    GassingspeedTemp = 0,
    GassingflagPrint = 0,
    GassingsecStop = 0,
    GassingONS = false,
    GassingtimeStop = 60, //NOTE: Timestop
    GassingWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    GassingflagRunning = false,
    LevelCheckerct = null,
    LevelCheckerresults = null,
    CntOutLevelChecker = null,
    LevelCheckeractual = 0,
    LevelCheckertime = 0,
    LevelCheckersec = 0,
    LevelCheckerflagStopped = false,
    LevelCheckerstate = 0,
    LevelCheckerspeed = 0,
    LevelCheckerspeedTemp = 0,
    LevelCheckerflagPrint = 0,
    LevelCheckersecStop = 0,
    LevelCheckerONS = false,
    LevelCheckertimeStop = 60, //NOTE: Timestop
    LevelCheckerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    LevelCheckerflagRunning = false,
    BathTestct = null,
    BathTestresults = null,
    CntOutBathTest = null,
    BathTestactual = 0,
    BathTesttime = 0,
    BathTestsec = 0,
    BathTestflagStopped = false,
    BathTeststate = 0,
    BathTestspeed = 0,
    BathTestspeedTemp = 0,
    BathTestflagPrint = 0,
    BathTestsecStop = 0,
    BathTestONS = false,
    BathTesttimeStop = 60, //NOTE: Timestop
    BathTestWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    BathTestflagRunning = false,
    MicroLeackct = null,
    MicroLeackresults = null,
    CntRejMicroLeack = null,
    CntOutMicroLeack = null,
    MicroLeackactual = 0,
    MicroLeacktime = 0,
    MicroLeacksec = 0,
    MicroLeackflagStopped = false,
    MicroLeackstate = 0,
    MicroLeackspeed = 0,
    MicroLeackspeedTemp = 0,
    MicroLeackflagPrint = 0,
    MicroLeacksecStop = 0,
    MicroLeackONS = false,
    MicroLeacktimeStop = 60, //NOTE: Timestop
    MicroLeackWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    MicroLeackflagRunning = false,
    Cappingct = null,
    Cappingresults = null,
    CntRejCapping = null,
    CntOutCapping = null,
    Cappingactual = 0,
    Cappingtime = 0,
    Cappingsec = 0,
    CappingflagStopped = false,
    Cappingstate = 0,
    Cappingspeed = 0,
    CappingspeedTemp = 0,
    CappingflagPrint = 0,
    CappingsecStop = 0,
    CappingONS = false,
    CappingtimeStop = 60, //NOTE: Timestop
    CappingWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    CappingStatus = null,
    CappingflagRunning = false,
    Packingct = null,
    Packingresults = null,
    CntInPacking = null,
    CntOutPacking = null,
    Packingactual = 0,
    Packingtime = 0,
    Packingsec = 0,
    PackingflagStopped = false,
    Packingstate = 0,
    Packingspeed = 0,
    PackingspeedTemp = 0,
    PackingflagPrint = 0,
    PackingsecStop = 0,
    PackingONS = false,
    PackingtimeStop = 60, //NOTE: Timestop
    PackingWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    PackingflagRunning = false
var CheckWeighterWaste=0,secCheckWeighter=Date.now();

var eol=0,secEOL=Date.now();

var cA1, cA2, cA3;

var files = fs.readdirSync("C:/PULSE/AERO9_LOGS/"),
    text2send = [],
    publishConfig,
    i = 0

var PubNub = require('pubnub')

var pubnub = new PubNub({
  publishKey : "pub-c-0ed92489-2094-40f6-8ba8-73cd03f4487e",
  subscribeKey : "sub-c-789a4f1c-bff6-11e7-888c-b22ca6e1970b",
  uuid: "ARG_TOR_AERO9"
})

var client1 = modbus.client.tcp.complete({
  'host': "192.168.10.92",
  'port': 502,
  'autoReconnect': true,
  'timeout': 60000,
  'logEnabled': true,
  'reconnectTimeout' : 30000
})
var client2 = modbus.client.tcp.complete({
  'host': "192.168.10.90",
  'port': 502,
  'autoReconnect': true,
  'timeout': 60000,
  'logEnabled': true,
  'reconnectTimeout' : 30000
})
var client3 = modbus.client.tcp.complete({
  'host': "192.168.10.91",
  'port': 502,
  'autoReconnect': true,
  'timeout': 60000,
  'logEnabled': true,
  'reconnectTimeout' : 30000
})

function idle(){
  i=0;
  text2send=[];
  for (var k=0;k<files.length;k++){
    var stats = fs.statSync("C:/PULSE/AERO9_LOGS/"+files[k]);
    var mtime = new Date(stats.mtime).getTime();
    if (mtime< (Date.now() - (8*60*1000))&&files[k].indexOf("serialbox")==-1){
      text2send[i]=files[k];
      i++;
    }
  }
}
   function senderData(){
      pubnub.publish(publishConfig, function(status, response) {});
    }

    function joinWord(num1, num2) {
      var bits = "00000000000000000000000000000000";
      var bin1 = num1.toString(2),
        bin2 = num2.toString(2),
        newNum = bits.split("");

      for (i = 0; i < bin1.length; i++) {
        newNum[31 - i] = bin1[(bin1.length - 1) - i];
      }
      for (i = 0; i < bin2.length; i++) {
        newNum[15 - i] = bin2[(bin2.length - 1) - i];
      }
      bits = newNum.join("");
      return parseInt(bits, 2);
    }
    try{

          client1.connect();
          client2.connect();
          client3.connect();

          client1.on('connect', function(err) {

            cA1 = setInterval(function(){
            client1.readCoils(0, 5).then(function (resp) {
              ValvsMachineStatus = resp.coils[2]
            });
            client1.readHoldingRegisters(0, 16).then(function(resp) {
                CntOutBathTest = joinWord(resp.register[0], resp.register[1]);
                CntOutFilling = joinWord(resp.register[2], resp.register[3]);
                CntOutValvsMachine = joinWord(resp.register[6], resp.register[7]);
                CntOutCrimper = joinWord(resp.register[8], resp.register[9]);
                CntOutGassing = joinWord(resp.register[10], resp.register[11]);
                CntOutLevelChecker = joinWord(resp.register[12], resp.register[13]);
            });
            //------------------------------------------BathTest----------------------------------------------
                  BathTestct = CntOutBathTest // NOTE: igualar al contador de salida
                  if (!BathTestONS && BathTestct) {
                    BathTestspeedTemp = BathTestct
                    BathTestsec = Date.now()
                    BathTestONS = true
                    BathTesttime = Date.now()
                  }
                  if(BathTestct > BathTestactual){
                    if(BathTestflagStopped){
                      BathTestspeed = BathTestct - BathTestspeedTemp
                      BathTestspeedTemp = BathTestct
                      BathTestsec = Date.now()
                      BathTesttime = Date.now()
                    }
                    BathTestsecStop = 0
                    BathTeststate = 1
                    BathTestflagStopped = false
                    BathTestflagRunning = true
                  } else if( BathTestct == BathTestactual ){
                    if(BathTestsecStop == 0){
                      BathTesttime = Date.now()
                      BathTestsecStop = Date.now()
                    }
                    if( ( Date.now() - ( BathTesttimeStop * 1000 ) ) >= BathTestsecStop ){
                      BathTestspeed = 0
                      BathTeststate = 2
                      BathTestspeedTemp = BathTestct
                      BathTestflagStopped = true
                      BathTestflagRunning = false
                      BathTestflagPrint = 1
                    }
                  }
                  BathTestactual = BathTestct
                  if(Date.now() - 60000 * BathTestWorktime >= BathTestsec && BathTestsecStop == 0){
                    if(BathTestflagRunning && BathTestct){
                      BathTestflagPrint = 1
                      BathTestsecStop = 0
                      BathTestspeed = BathTestct - BathTestspeedTemp
                      BathTestspeedTemp = BathTestct
                      BathTestsec = Date.now()
                    }
                  }
                  BathTestresults = {
                    ST: BathTeststate,
                    CPQO: CntOutBathTest,
                    SP: BathTestspeed
                  }
                  if (BathTestflagPrint == 1) {
                    for (var key in BathTestresults) {
                      if( BathTestresults[key] != null && ! isNaN(BathTestresults[key]) )
                      //NOTE: Cambiar path
                      fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_BathTest_AERO9.log', 'tt=' + BathTesttime + ',var=' + key + ',val=' + BathTestresults[key] + '\n')
                    }
                    BathTestflagPrint = 0
                    BathTestsecStop = 0
                    BathTesttime = Date.now()
                  }
            //------------------------------------------BathTest----------------------------------------------
        //------------------------------------------Filling----------------------------------------------
              Fillingct = CntOutFilling // NOTE: igualar al contador de salida
              if (!FillingONS && Fillingct) {
                FillingspeedTemp = Fillingct
                Fillingsec = Date.now()
                FillingONS = true
                Fillingtime = Date.now()
              }
              if(Fillingct > Fillingactual){
                if(FillingflagStopped){
                  Fillingspeed = Fillingct - FillingspeedTemp
                  FillingspeedTemp = Fillingct
                  Fillingsec = Date.now()
                  Fillingtime = Date.now()
                }
                FillingsecStop = 0
                Fillingstate = 1
                FillingflagStopped = false
                FillingflagRunning = true
              } else if( Fillingct == Fillingactual ){
                if(FillingsecStop == 0){
                  Fillingtime = Date.now()
                  FillingsecStop = Date.now()
                }
                if( ( Date.now() - ( FillingtimeStop * 1000 ) ) >= FillingsecStop ){
                  Fillingspeed = 0
                  Fillingstate = 2
                  FillingspeedTemp = Fillingct
                  FillingflagStopped = true
                  FillingflagRunning = false
                  FillingflagPrint = 1
                }
              }
              Fillingactual = Fillingct
              if(Date.now() - 60000 * FillingWorktime >= Fillingsec && FillingsecStop == 0){
                if(FillingflagRunning && Fillingct){
                  FillingflagPrint = 1
                  FillingsecStop = 0
                  Fillingspeed = Fillingct - FillingspeedTemp
                  FillingspeedTemp = Fillingct
                  Fillingsec = Date.now()
                }
              }
              Fillingresults = {
                ST: Fillingstate,
                CPQO: CntOutFilling,
                SP: Fillingspeed
              }
              if (FillingflagPrint == 1) {
                for (var key in Fillingresults) {
                  if( Fillingresults[key] != null && ! isNaN(Fillingresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Filling_AERO9.log', 'tt=' + Fillingtime + ',var=' + key + ',val=' + Fillingresults[key] + '\n')
                }
                FillingflagPrint = 0
                FillingsecStop = 0
                Fillingtime = Date.now()
              }
        //------------------------------------------Filling----------------------------------------------
        //------------------------------------------ValvsMachine----------------------------------------------
              ValvsMachinect = CntOutValvsMachine // NOTE: igualar al contador de salida
              if (!ValvsMachineONS && ValvsMachinect) {
                ValvsMachinespeedTemp = ValvsMachinect
                ValvsMachinesec = Date.now()
                ValvsMachineONS = true
                ValvsMachinetime = Date.now()
              }
              if(ValvsMachinect > ValvsMachineactual){
                if(ValvsMachineflagStopped){
                  ValvsMachinespeed = ValvsMachinect - ValvsMachinespeedTemp
                  ValvsMachinespeedTemp = ValvsMachinect
                  ValvsMachinesec = Date.now()
                  ValvsMachinetime = Date.now()
                }
                ValvsMachinesecStop = 0
                ValvsMachinestate = 1
                ValvsMachineflagStopped = false
                ValvsMachineflagRunning = true
              } else if( ValvsMachinect == ValvsMachineactual ){
                if(ValvsMachinesecStop == 0){
                  ValvsMachinetime = Date.now()
                  ValvsMachinesecStop = Date.now()
                }
                if( ( Date.now() - ( ValvsMachinetimeStop * 1000 ) ) >= ValvsMachinesecStop ){
                  ValvsMachinespeed = 0
                  ValvsMachinestate = 2
                  ValvsMachinespeedTemp = ValvsMachinect
                  ValvsMachineflagStopped = true
                  ValvsMachineflagRunning = false
                  ValvsMachineflagPrint = 1
                  if ( ! ValvsMachineStatus )
                    ValvsMachinestate = 3
                }
              }
              ValvsMachineactual = ValvsMachinect
              if(Date.now() - 60000 * ValvsMachineWorktime >= ValvsMachinesec && ValvsMachinesecStop == 0){
                if(ValvsMachineflagRunning && ValvsMachinect){
                  ValvsMachineflagPrint = 1
                  ValvsMachinesecStop = 0
                  ValvsMachinespeed = ValvsMachinect - ValvsMachinespeedTemp
                  ValvsMachinespeedTemp = ValvsMachinect
                  ValvsMachinesec = Date.now()
                }
              }
              ValvsMachineresults = {
                ST: ValvsMachinestate,
                CPQO: CntOutValvsMachine,
                SP: ValvsMachinespeed
              }
              if (ValvsMachineflagPrint == 1) {
                for (var key in ValvsMachineresults) {
                  if( ValvsMachineresults[key] != null && ! isNaN(ValvsMachineresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_ValvsMachine_AERO9.log', 'tt=' + ValvsMachinetime + ',var=' + key + ',val=' + ValvsMachineresults[key] + '\n')
                }
                ValvsMachineflagPrint = 0
                ValvsMachinesecStop = 0
                ValvsMachinetime = Date.now()
              }
        //------------------------------------------ValvsMachine----------------------------------------------
        //------------------------------------------Crimper----------------------------------------------
              Crimperct = CntOutCrimper // NOTE: igualar al contador de salida
              if (!CrimperONS && Crimperct) {
                CrimperspeedTemp = Crimperct
                Crimpersec = Date.now()
                CrimperONS = true
                Crimpertime = Date.now()
              }
              if(Crimperct > Crimperactual){
                if(CrimperflagStopped){
                  Crimperspeed = Crimperct - CrimperspeedTemp
                  CrimperspeedTemp = Crimperct
                  Crimpersec = Date.now()
                  Crimpertime = Date.now()
                }
                CrimpersecStop = 0
                Crimperstate = 1
                CrimperflagStopped = false
                CrimperflagRunning = true
              } else if( Crimperct == Crimperactual ){
                if(CrimpersecStop == 0){
                  Crimpertime = Date.now()
                  CrimpersecStop = Date.now()
                }
                if( ( Date.now() - ( CrimpertimeStop * 1000 ) ) >= CrimpersecStop ){
                  Crimperspeed = 0
                  Crimperstate = 2
                  CrimperspeedTemp = Crimperct
                  CrimperflagStopped = true
                  CrimperflagRunning = false
                  CrimperflagPrint = 1
                }
              }
              Crimperactual = Crimperct
              if(Date.now() - 60000 * CrimperWorktime >= Crimpersec && CrimpersecStop == 0){
                if(CrimperflagRunning && Crimperct){
                  CrimperflagPrint = 1
                  CrimpersecStop = 0
                  Crimperspeed = Crimperct - CrimperspeedTemp
                  CrimperspeedTemp = Crimperct
                  Crimpersec = Date.now()
                }
              }
              Crimperresults = {
                ST: Crimperstate,
                CPQO: CntOutCrimper,
                SP: Crimperspeed
              }
              if (CrimperflagPrint == 1) {
                for (var key in Crimperresults) {
                  if( Crimperresults[key] != null && ! isNaN(Crimperresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Crimper_AERO9.log', 'tt=' + Crimpertime + ',var=' + key + ',val=' + Crimperresults[key] + '\n')
                }
                CrimperflagPrint = 0
                CrimpersecStop = 0
                Crimpertime = Date.now()
              }
        //------------------------------------------Crimper----------------------------------------------
        //------------------------------------------Gassing----------------------------------------------
              Gassingct = CntOutGassing // NOTE: igualar al contador de salida
              if (!GassingONS && Gassingct) {
                GassingspeedTemp = Gassingct
                Gassingsec = Date.now()
                GassingONS = true
                Gassingtime = Date.now()
              }
              if(Gassingct > Gassingactual){
                if(GassingflagStopped){
                  Gassingspeed = Gassingct - GassingspeedTemp
                  GassingspeedTemp = Gassingct
                  Gassingsec = Date.now()
                  Gassingtime = Date.now()
                }
                GassingsecStop = 0
                Gassingstate = 1
                GassingflagStopped = false
                GassingflagRunning = true
              } else if( Gassingct == Gassingactual ){
                if(GassingsecStop == 0){
                  Gassingtime = Date.now()
                  GassingsecStop = Date.now()
                }
                if( ( Date.now() - ( GassingtimeStop * 1000 ) ) >= GassingsecStop ){
                  Gassingspeed = 0
                  Gassingstate = 2
                  GassingspeedTemp = Gassingct
                  GassingflagStopped = true
                  GassingflagRunning = false
                  GassingflagPrint = 1
                }
              }
              Gassingactual = Gassingct
              if(Date.now() - 60000 * GassingWorktime >= Gassingsec && GassingsecStop == 0){
                if(GassingflagRunning && Gassingct){
                  GassingflagPrint = 1
                  GassingsecStop = 0
                  Gassingspeed = Gassingct - GassingspeedTemp
                  GassingspeedTemp = Gassingct
                  Gassingsec = Date.now()
                }
              }
              Gassingresults = {
                ST: Gassingstate,
                CPQO: CntOutGassing,
                SP: Gassingspeed
              }
              if (GassingflagPrint == 1) {
                for (var key in Gassingresults) {
                  if( Gassingresults[key] != null && ! isNaN(Gassingresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Gassing_AERO9.log', 'tt=' + Gassingtime + ',var=' + key + ',val=' + Gassingresults[key] + '\n')
                }
                GassingflagPrint = 0
                GassingsecStop = 0
                Gassingtime = Date.now()
              }
        //------------------------------------------Gassing----------------------------------------------
        //------------------------------------------LevelChecker----------------------------------------------
              LevelCheckerct = CntOutLevelChecker // NOTE: igualar al contador de salida
              if (!LevelCheckerONS && LevelCheckerct) {
                LevelCheckerspeedTemp = LevelCheckerct
                LevelCheckersec = Date.now()
                LevelCheckerONS = true
                LevelCheckertime = Date.now()
              }
              if(LevelCheckerct > LevelCheckeractual){
                if(LevelCheckerflagStopped){
                  LevelCheckerspeed = LevelCheckerct - LevelCheckerspeedTemp
                  LevelCheckerspeedTemp = LevelCheckerct
                  LevelCheckersec = Date.now()
                  LevelCheckertime = Date.now()
                }
                LevelCheckersecStop = 0
                LevelCheckerstate = 1
                LevelCheckerflagStopped = false
                LevelCheckerflagRunning = true
              } else if( LevelCheckerct == LevelCheckeractual ){
                if(LevelCheckersecStop == 0){
                  LevelCheckertime = Date.now()
                  LevelCheckersecStop = Date.now()
                }
                if( ( Date.now() - ( LevelCheckertimeStop * 1000 ) ) >= LevelCheckersecStop ){
                  LevelCheckerspeed = 0
                  LevelCheckerstate = 2
                  LevelCheckerspeedTemp = LevelCheckerct
                  LevelCheckerflagStopped = true
                  LevelCheckerflagRunning = false
                  LevelCheckerflagPrint = 1
                }
              }
              LevelCheckeractual = LevelCheckerct
              if(Date.now() - 60000 * LevelCheckerWorktime >= LevelCheckersec && LevelCheckersecStop == 0){
                if(LevelCheckerflagRunning && LevelCheckerct){
                  LevelCheckerflagPrint = 1
                  LevelCheckersecStop = 0
                  LevelCheckerspeed = LevelCheckerct - LevelCheckerspeedTemp
                  LevelCheckerspeedTemp = LevelCheckerct
                  LevelCheckersec = Date.now()
                }
              }
              LevelCheckerresults = {
                ST: LevelCheckerstate,
                CPQO: CntOutLevelChecker,
                SP: LevelCheckerspeed
              }
              if (LevelCheckerflagPrint == 1) {
                for (var key in LevelCheckerresults) {
                  if( LevelCheckerresults[key] != null && ! isNaN(LevelCheckerresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_LevelChecker_AERO9.log', 'tt=' + LevelCheckertime + ',var=' + key + ',val=' + LevelCheckerresults[key] + '\n')
                }
                LevelCheckerflagPrint = 0
                LevelCheckersecStop = 0
                LevelCheckertime = Date.now()
              }
        //------------------------------------------LevelChecker----------------------------------------------
          },1000);
          });
          client1.on('error', function(err) {
            clearInterval(cA1);
          });
          client1.on('close', function() {
            clearInterval(cA1);
          });
          client2.on('connect', function(err) {

            cA2 = setInterval(function(){
              client2.readCoils(0, 5).then(function (resp) {
                CappingStatus = resp.coils[3]
              });
              client2.readHoldingRegisters(0, 16).then(function(resp) {
                CntInCanPrint = joinWord(resp.register[0], resp.register[1]);
                CntOutMicroLeack = joinWord(resp.register[2], resp.register[3]);
                CntRejMicroLeack = joinWord(resp.register[4], resp.register[5]);
                CntOutCapping = joinWord(resp.register[8], resp.register[9]);
                CntRejCapping = joinWord(resp.register[10], resp.register[11]);
              });
              //------------------------------------------CanPrint----------------------------------------------
                    CanPrintct = CntInCanPrint // NOTE: igualar al contador de salida
                    if (!CanPrintONS && CanPrintct) {
                      CanPrintspeedTemp = CanPrintct
                      CanPrintsec = Date.now()
                      CanPrintONS = true
                      CanPrinttime = Date.now()
                    }
                    if(CanPrintct > CanPrintactual){
                      if(CanPrintflagStopped){
                        CanPrintspeed = CanPrintct - CanPrintspeedTemp
                        CanPrintspeedTemp = CanPrintct
                        CanPrintsec = Date.now()
                        CanPrinttime = Date.now()
                      }
                      CanPrintsecStop = 0
                      CanPrintstate = 1
                      CanPrintflagStopped = false
                      CanPrintflagRunning = true
                    } else if( CanPrintct == CanPrintactual ){
                      if(CanPrintsecStop == 0){
                        CanPrinttime = Date.now()
                        CanPrintsecStop = Date.now()
                      }
                      if( ( Date.now() - ( CanPrinttimeStop * 1000 ) ) >= CanPrintsecStop ){
                        CanPrintspeed = 0
                        CanPrintstate = 2
                        CanPrintspeedTemp = CanPrintct
                        CanPrintflagStopped = true
                        CanPrintflagRunning = false
                        CanPrintflagPrint = 1
                      }
                    }
                    CanPrintactual = CanPrintct
                    if(Date.now() - 60000 * CanPrintWorktime >= CanPrintsec && CanPrintsecStop == 0){
                      if(CanPrintflagRunning && CanPrintct){
                        CanPrintflagPrint = 1
                        CanPrintsecStop = 0
                        CanPrintspeed = CanPrintct - CanPrintspeedTemp
                        CanPrintspeedTemp = CanPrintct
                        CanPrintsec = Date.now()
                      }
                    }
                    CanPrintresults = {
                      ST: CanPrintstate,
                      CPQI: CntInCanPrint,
                      SP: CanPrintspeed
                    }
                    if (CanPrintflagPrint == 1) {
                      for (var key in CanPrintresults) {
                        if( CanPrintresults[key] != null && ! isNaN(CanPrintresults[key]) )
                        //NOTE: Cambiar path
                        fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_CanPrint_AERO9.log', 'tt=' + CanPrinttime + ',var=' + key + ',val=' + CanPrintresults[key] + '\n')
                      }
                      CanPrintflagPrint = 0
                      CanPrintsecStop = 0
                      CanPrinttime = Date.now()
                    }
              //------------------------------------------CanPrint----------------------------------------------
        //------------------------------------------MicroLeack----------------------------------------------
              MicroLeackct = CntOutMicroLeack // NOTE: igualar al contador de salida
              if (!MicroLeackONS && MicroLeackct) {
                MicroLeackspeedTemp = MicroLeackct
                MicroLeacksec = Date.now()
                MicroLeackONS = true
                MicroLeacktime = Date.now()
              }
              if(MicroLeackct > MicroLeackactual){
                if(MicroLeackflagStopped){
                  MicroLeackspeed = MicroLeackct - MicroLeackspeedTemp
                  MicroLeackspeedTemp = MicroLeackct
                  MicroLeacksec = Date.now()
                  MicroLeacktime = Date.now()
                }
                MicroLeacksecStop = 0
                MicroLeackstate = 1
                MicroLeackflagStopped = false
                MicroLeackflagRunning = true
              } else if( MicroLeackct == MicroLeackactual ){
                if(MicroLeacksecStop == 0){
                  MicroLeacktime = Date.now()
                  MicroLeacksecStop = Date.now()
                }
                if( ( Date.now() - ( MicroLeacktimeStop * 1000 ) ) >= MicroLeacksecStop ){
                  MicroLeackspeed = 0
                  MicroLeackstate = 2
                  MicroLeackspeedTemp = MicroLeackct
                  MicroLeackflagStopped = true
                  MicroLeackflagRunning = false
                  MicroLeackflagPrint = 1
                }
              }
              MicroLeackactual = MicroLeackct
              if(Date.now() - 60000 * MicroLeackWorktime >= MicroLeacksec && MicroLeacksecStop == 0){
                if(MicroLeackflagRunning && MicroLeackct){
                  MicroLeackflagPrint = 1
                  MicroLeacksecStop = 0
                  MicroLeackspeed = MicroLeackct - MicroLeackspeedTemp
                  MicroLeackspeedTemp = MicroLeackct
                  MicroLeacksec = Date.now()
                }
              }
              MicroLeackresults = {
                ST: MicroLeackstate,
                CPQO: CntOutMicroLeack,
                CPQR: CntRejMicroLeack,
                SP: MicroLeackspeed
              }
              if (MicroLeackflagPrint == 1) {
                for (var key in MicroLeackresults) {
                  if( MicroLeackresults[key] != null && ! isNaN(MicroLeackresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_MicroLeack_AERO9.log', 'tt=' + MicroLeacktime + ',var=' + key + ',val=' + MicroLeackresults[key] + '\n')
                }
                MicroLeackflagPrint = 0
                MicroLeacksecStop = 0
                MicroLeacktime = Date.now()
              }
        //------------------------------------------MicroLeack----------------------------------------------
        //------------------------------------------Capping----------------------------------------------
              Cappingct = CntOutCapping // NOTE: igualar al contador de salida
              if (!CappingONS && Cappingct) {
                CappingspeedTemp = Cappingct
                Cappingsec = Date.now()
                CappingONS = true
                Cappingtime = Date.now()
              }
              if(Cappingct > Cappingactual){
                if(CappingflagStopped){
                  Cappingspeed = Cappingct - CappingspeedTemp
                  CappingspeedTemp = Cappingct
                  Cappingsec = Date.now()
                  Cappingtime = Date.now()
                }
                CappingsecStop = 0
                Cappingstate = 1
                CappingflagStopped = false
                CappingflagRunning = true
              } else if( Cappingct == Cappingactual ){
                if(CappingsecStop == 0){
                  Cappingtime = Date.now()
                  CappingsecStop = Date.now()
                }
                if( ( Date.now() - ( CappingtimeStop * 1000 ) ) >= CappingsecStop ){
                  Cappingspeed = 0
                  Cappingstate = 2
                  CappingspeedTemp = Cappingct
                  CappingflagStopped = true
                  CappingflagRunning = false
                  CappingflagPrint = 1
                  if ( ! CappingStatus )
                    Cappingstate = 3
                }
              }
              Cappingactual = Cappingct
              if(Date.now() - 60000 * CappingWorktime >= Cappingsec && CappingsecStop == 0){
                if(CappingflagRunning && Cappingct){
                  CappingflagPrint = 1
                  CappingsecStop = 0
                  Cappingspeed = Cappingct - CappingspeedTemp
                  CappingspeedTemp = Cappingct
                  Cappingsec = Date.now()
                }
              }
              Cappingresults = {
                ST: Cappingstate,
                CPQO: CntOutCapping,
                CPQR: CntRejCapping,
                SP: Cappingspeed
              }
              if (CappingflagPrint == 1) {
                for (var key in Cappingresults) {
                  if( Cappingresults[key] != null && ! isNaN(Cappingresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Capping_AERO9.log', 'tt=' + Cappingtime + ',var=' + key + ',val=' + Cappingresults[key] + '\n')
                }
                CappingflagPrint = 0
                CappingsecStop = 0
                Cappingtime = Date.now()
              }
        //------------------------------------------Capping----------------------------------------------
                 },1000);

          });
          client2.on('error', function(err) {
            clearInterval(cA2);
          });
          client2.on('close', function() {
            clearInterval(cA2);
          });
          client3.on('connect', function(err) {

            cA3 = setInterval(function(){
              client3.readHoldingRegisters(0, 16).then(function(resp) {
                CntInPacking = joinWord(resp.register[0], resp.register[1]);
                CntOutPacking = joinWord(resp.register[2], resp.register[3]);
                CheckWeighterWaste = joinWord(resp.register[4], resp.register[5]);
                eol = joinWord(resp.register[6], resp.register[7]);
              });
        //------------------------------------------Packing----------------------------------------------
              Packingct = CntOutPacking // NOTE: igualar al contador de salida
              if (!PackingONS && Packingct) {
                PackingspeedTemp = Packingct
                Packingsec = Date.now()
                PackingONS = true
                Packingtime = Date.now()
              }
              if(Packingct > Packingactual){
                if(PackingflagStopped){
                  Packingspeed = Packingct - PackingspeedTemp
                  PackingspeedTemp = Packingct
                  Packingsec = Date.now()
                  Packingtime = Date.now()
                }
                PackingsecStop = 0
                Packingstate = 1
                PackingflagStopped = false
                PackingflagRunning = true
              } else if( Packingct == Packingactual ){
                if(PackingsecStop == 0){
                  Packingtime = Date.now()
                  PackingsecStop = Date.now()
                }
                if( ( Date.now() - ( PackingtimeStop * 1000 ) ) >= PackingsecStop ){
                  Packingspeed = 0
                  Packingstate = 2
                  PackingspeedTemp = Packingct
                  PackingflagStopped = true
                  PackingflagRunning = false
                  PackingflagPrint = 1
                }
              }
              Packingactual = Packingct
              if(Date.now() - 60000 * PackingWorktime >= Packingsec && PackingsecStop == 0){
                if(PackingflagRunning && Packingct){
                  PackingflagPrint = 1
                  PackingsecStop = 0
                  Packingspeed = Packingct - PackingspeedTemp
                  PackingspeedTemp = Packingct
                  Packingsec = Date.now()
                }
              }
              Packingresults = {
                ST: Packingstate,
                CPQI: CntInPacking,
                CPQO: CntOutPacking,
                SP: Packingspeed
              }
              if (PackingflagPrint == 1) {
                for (var key in Packingresults) {
                  if( Packingresults[key] != null && ! isNaN(Packingresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Packing_AERO9.log', 'tt=' + Packingtime + ',var=' + key + ',val=' + Packingresults[key] + '\n')
                }
                PackingflagPrint = 0
                PackingsecStop = 0
                Packingtime = Date.now()
              }
        //------------------------------------------Packing----------------------------------------------
                 //////----------------------------------------------------------------------------------------------------------------------
              if(secCheckWeighter < Date.now() - 60000){
                fs.appendFileSync("C:/Pulse/AERO9_LOGS/arg_tor_CheckWeighter_AERO9.log","tt="+Date.now()+",var=CPQR"+",val="+CheckWeighterWaste+"\n");

                secCheckWeighter= Date.now();
              }
              //////--EOL--------------------------------------------------------------------------------------------------------------------


                 //////--EOL--------------------------------------------------------------------------------------------------------------------
              if(secEOL < Date.now() - 60000){
                fs.appendFileSync("C:/Pulse/AERO9_LOGS/arg_tor_EOL_AERO9.log","tt="+Date.now()+",var=EOL"+",val="+eol+"\n");

                secEOL=Date.now();
              }
              //////--EOL--------------------------------------------------------------------------------


            },1000);
          });
          client3.on('error', function(err) {
            clearInterval(cA3);
          });
          client3.on('close', function() {
            clearInterval(cA3);
          });


var noty=setInterval(function(){
   if(secPubNub>=60*5){
      idle();
      secPubNub=0;
      publishConfig = {
        channel : "Tor_Aero_Monitor",
        message : {
              line: "Aero9",
              tt: Date.now(),
              machines: text2send
              }
      };
      senderData();
    }else{
      secPubNub++;
    }
   } , 1000);

}catch(err){
   fs.appendFileSync("error.log", err + '\n');
   clearInterval(noty);
}
