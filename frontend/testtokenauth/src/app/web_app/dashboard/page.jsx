import UseToken from "@/app/web_app/dashboard/components/useToken";
import CurrentToken from "@/app/web_app/dashboard/components/currentToken";
import TokenList from "@/app/web_app/dashboard/components/tableTokens";
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Current Token
          </Typography>
          <CurrentToken />
        </CardContent>
      </Card>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Use Your Token
          </Typography>
          <UseToken />
        </CardContent>
      </Card>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            List of OTP Tokens
          </Typography>
          <TokenList />
        </CardContent>
      </Card>
    </Box>
  );
}
